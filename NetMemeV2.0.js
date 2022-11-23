// �l�g�~��
// ----------------------------------------
// �萔
var Ori_RESOURCE_FILE = "Neta_minixmini.png"; //���l�^�摜�W
var Meme_RESOURCE_FILE= "Meme_minixmini.png"; //�~�[���摜�W
var NetMemeBottom_FILE= "bg1.jpg"; 
var NotNetMemeBottom_FILE="bg1,jpg";
var Pairs=9;       //�y�A�̑g��
var ROWS=3;			//�X�e�[�W�̍s��
var COLS=3;			//�X�e�[�W�̗�
var CARD_H = 142;	// �J�[�h�̍���
var CARD_W = 142;	// �J�[�h�̕�
var DEFAULT_TIME = 180;	// �c�莞��

// �ϐ�
var Ori_cards = [];	// ���l�^�J�[�h�̔ԍ����L�^
var Meme_cards= []; // �~�[���J�[�h�̔ԍ����L�^
var Ori_opened = [];// ���l�^�J�[�h���J�������ǂ������L�^
var Meme_opened= [];// �~�[���J�[�h���J�������ǂ������L�^
var Ori_resImage;   // ���l�^���ǂݍ��܂��ꏊ
var Meme_resImage;  // �~�[�����ǂݍ��܂��ꏊ
var Bottom_resImage; // �l�g�~���{�^���i�[�ꏊ
var NotBottom_resImage; // Not�l�g�~���{�^���i�[�ꏊ
var ctx;        // 2D�O���t�B�b�N�����p
var ctx2;		//�l�g�~���{�^�������p
var ctx3;		//Not�l�g�~���{�^�������p
var selIndex;	// �v���[���[�̑I�������l
var memeIndex;	//�l�g�~���{�^������l
var stopper;    // �l�g�~���{�^���������̔���
var score;		// �X�R�A
//var clear;		//�Q�[���N���A
var time;		// �c�莞��
var lock;		// �A�����N�b�N�h�~�p
var timer;		// �^�C�}�[


// ����������
window.onload = function () {
	// �`��R���e�L�X�g�̎擾
	var canvas = $("mainCanvas");
	var canvas2 = $("bottomCanvas");
	//var canvas3 = $("Not_bottomCanvas");
	ctx = canvas.getContext("2d");
	ctx2 = canvas2.getContext("2d");
	//ctx3 = canvas3.getContext("2d");
    canvas.onmousedown = canvasMDHandler; //�J�[�h���N���b�N������̏���
    canvas2.onmousedown = canvasNetMeme;
	// �摜�t�@�C���̓ǂݍ���
	Ori_resImage = loadImage(Ori_RESOURCE_FILE, function () {
		initGame();
	});
    Meme_resImage = loadImage(Meme_RESOURCE_FILE, function() {
        initGame();
    })
}

// �Q�[���̏�����
function initGame() {
	selIndex = -1;	// ���I��
	score = 0;
	time = DEFAULT_TIME;
	$("score").innerHTML = "SCORE: 0";
	initCards();
	drawStage();
	Bottom_resImage = document.getElementById("NetMeme_buttom");
	ctx2.drawImage(Bottom_resImage,0,0);
	NotBottom_resImage = document.getElementById("Not_NetMeme_buttom");
	ctx3.drawImage(NotBottom_resImage,0,0);
	//countTime();
}


// �J�[�h�����������ăV���b�t������
function initCards() {
	// 10�y�A�̃J�[�h20����z��ɑ��
    // ���l�^�i�~�[���j�J�[�h10�������l�^(�~�[���j�p�z��ɑ��
	for (var i = 0; i < Pairs; i++) {
		Ori_cards[i] = i+1;
        Meme_cards[i] = i+1;
	}
	for (var i = 0; i < Ori_cards.length; i++) {
		Ori_opened[i] = false;
        Meme_opened[i]= false;
	}
    

	// �V���b�t������
	for (var i = 0; i < Ori_cards.length; i++) {
		var r = rand(Ori_cards.length);
		var tmp1 = Ori_cards[i];
		Ori_cards[i] = Ori_cards[r];
		Ori_cards[r] = tmp1;

        var s = rand(Meme_cards.length);
        var tmp2 =  Meme_cards[i];
        Meme_cards[i] = Meme_cards[s];
		Meme_cards[s] = tmp2;
	}
}


// �X�e�[�W��`�悷��
function drawStage() {
	// �J�[�h���ꖇ���`�悷��
	for (var i = 0; i < Ori_cards.length; i++) {
		var Ori_no = Ori_cards[i];
		if (Ori_opened[i] == false && selIndex != i) {
			Ori_no = 0;
		}
		var row = Math.floor(i / COLS);
		var col = i % COLS;
		var y = CARD_H * row;
		var x = CARD_W * col;
		ctx.drawImage(Ori_resImage,
			Ori_no * CARD_W, 0 , CARD_W, CARD_H,
			x, y, CARD_W, CARD_H);
	}

    for (var i = 0; i < Meme_cards.length; i++) {
        var Meme_no= Meme_cards[i];
        if (Meme_opened[i] == false && selIndex != i) {
			Meme_no = 0;
		}

		var row = Math.floor(i / COLS);
		var col = i % COLS;
		var y = CARD_H * row;
		var x = CARD_W * col;
        
        ctx.drawImage(Meme_resImage,
            Meme_no * CARD_W , 0 , CARD_W, CARD_H,
            x + CARD_W*(COLS+1) , y , CARD_W, CARD_H);
	}
}

function Ori_drawStage(){
    for (var i = 0; i < Ori_cards.length; i++) {
		var Ori_no = Ori_cards[i];
		if (Ori_opened[i] == false && selIndex != i) {
			Ori_no = 0;
		}
		var row = Math.floor(i / COLS);
		var col = i % COLS;
		var y = CARD_H * row;
		var x = CARD_W * col;
		ctx.drawImage(Ori_resImage,
			Ori_no * CARD_W, 0 , CARD_W, CARD_H,
			x, y, CARD_W, CARD_H);
	}
}

function Meme_drawStage(){
    for (var i = 0; i < Meme_cards.length; i++) {
        var Meme_no= Meme_cards[i];
        if (Meme_opened[i] == false && selIndex != i) {
			Meme_no = 0;
		}
		var row = Math.floor(i / COLS);
		var col = i % COLS;
		var y = CARD_H * row;
		var x = CARD_W * col;
        
        ctx.drawImage(Meme_resImage,
            Meme_no * CARD_W , 0 , CARD_W, CARD_H,
            x + CARD_W*(COLS+1) , y , CARD_W, CARD_H);
	}
}

// �}�E�X�ŃJ�[�h��I�񂾎��̃C�x���g
function canvasMDHandler(e) {
	// �N���b�N�����ʒu�𓾂�
	var x = e.clientX;
	var y = e.clientY;
	var r = e.target.getBoundingClientRect();
	x -= r.left;
	y -= r.top;
	// �ǂ̈ʒu�̃J�[�h���N���b�N����������
	var col = Math.floor(x / CARD_W);
	var row = Math.floor(y / CARD_H);
	//pos = col + row *COLS;
    var pos = row*COLS;

    if(col==0) pos+=0 ;
    else if(col==1) pos+=1;
    else if(col==2) pos+=2;
    else if(col==4) pos+=Pairs;
    else if(col==5) pos+=Pairs+1;
    else if(col==6) pos+=Pairs+2;
    else pos=-1;
    console.log(document.getElementById("Scenario").getAttribute("data-name") )
    console.log("click=" + pos);
	clickCard(pos);
}

// �v���C���[���J�[�h��I�񂾂Ƃ��̏���
function clickCard(pos) {
	// ���ɃI�[�v�������J�[�h�Ȃ牽�����Ȃ�
    if(document.getElementById("Scenario").getAttribute("data-name") =='0'){
        if(Pairs>pos){
            if (Ori_opened[pos]) return;
        } else {
            if (Meme_opened[pos-Pairs]) return;
        } 
        if (pos==-1) return;
        if (lock) return;
        // 1���ڂ̑I����
        if (selIndex < 0) {
            //���l�^���~�[���J�[�h��
            if(Pairs>pos){
                selIndex = pos;
                Ori_drawStage();
                //selIndex += Pairs;
            } else {
                selIndex = pos-Pairs;
                Meme_drawStage();
                selIndex = pos;
            }
            document.getElementById("Scenario").setAttribute("data-name","1");
            return;
        }
	} else if (document.getElementById("Scenario").getAttribute("data-name") =='1'){
        //�񖇖�
	    if (pos == selIndex) return;
	    // �I������2�������v���邩�H
        var c1,c2;
        if(Pairs>selIndex){
            //�ꖇ�ڂ����l�^
            c1 = Ori_cards[selIndex];
            if(Pairs>pos){
                //�񖇖ڂ����l�^
                c2 = Ori_cards[pos];
                Ori_opened[pos] = true;
                Ori_drawStage();
            } else {
                //�񖇖ڂ��~�[��
                c2 = Meme_cards[pos-Pairs];
                Meme_opened[pos-Pairs] = true;
                var t = selIndex;
                selIndex =-1;
                Meme_drawStage();
                selIndex = t;
            }
        } else {
            //�ꖇ�ڂ��~�[��
            c1 = Meme_cards[selIndex-Pairs];
            if(Pairs>pos){
                //�񖇖ڂ����l�^
                c2 = Ori_cards[pos];
                Ori_opened[pos] = true;
                Ori_drawStage();
            } else {
                //�񖇖ڂ��~�[��
                c2 = Meme_cards[pos-Pairs];
                Meme_opened[pos-Pairs] = true;
                selIndex -= Pairs;
                Meme_drawStage();
            }
        }
        //console.log("pos"+pos);
        //console.log("score"+score);
        document.getElementById("selIndex").setAttribute("data-name",selIndex);
        document.getElementById("pos").setAttribute("data-name",pos);
        document.getElementById("c1").setAttribute("data-name",c1);
        document.getElementById("c2").setAttribute("data-name",c2);
        document.getElementById("Scenario").setAttribute("data-name","2");
    } else if(document.getElementById("Scenario").getAttribute("data-name") =='2'){
        //var result = Thinking_NetMeme();
        //if (result ==0) return;
        selIndex=document.getElementById("selIndex").getAttribute("data-name");
        pos=document.getElementById("pos").getAttribute("data-name");
        c1=document.getElementById("c1").getAttribute("data-name");
        c2=document.getElementById("c2").getAttribute("data-name");
        //console.log("c1="+c1);
        //console.log("c2="+c2);
        //canvas2.onmousedown = judgeNetmeme;
        if(memeIndex==1){
            //�l�g�~���{�^���������ꂽ�Ƃ�
            if (c1 == c2) {
                if(Pairs>selIndex){
                    Ori_opened[selIndex] = true;
                } else {
                    Meme_opened[selIndex-Pairs] = true;
                }
                if(Pairs>pos){
                    Ori_opened[pos] = true;
                } else {
                    Meme_opened[pos-Pairs] = true;
                }
                
                selIndex = -1;
                score += 2;
                $("score").innerHTML = "SCORE: " + score;
                memeIndex=0;
                drawStage();
                // �N���A����
                if (Clear(Ori_opened)==1) {
                    setTimeout(function () {
                        alert("GAME CLEAR!");
                        clearTimeout(timer);
                        initGame();
                    },1);
                }
                $("nice").play();
            } else {
                // �ԈႢ�I1�b�����J�[�h���v���C���[�Ɍ�����
                score -= 1;
                $("score").innerHTML = "SCORE: " + score;
                memeIndex=0;
                lock = true;
                setTimeout(function () {
                    if(Pairs>pos){
                        Ori_opened[pos] = false;
                    } else {
                        Meme_opened[pos-Pairs] = false;
                    }
                    selIndex = -1;		// 1���ڂ̃J�[�h�𖢑I����
                    drawStage();	// �X�e�[�W��`��
                    lock = false;
                },1000);
                $("ng").play();
            }
        } else {
            //�l�g�~���`�������W���Ȃ��Ƃ�
            lock = true;
            setTimeout(function () {
                if(Pairs>pos){
                    Ori_opened[pos] = false;                
                } else {
                    Meme_opened[pos-Pairs] = false;
                }
                selIndex = -1;		// 1���ڂ̃J�[�h�𖢑I����
                drawStage();	// �X�e�[�W��`��
                lock = false;
            },1000);    
        }
        // console.log("pos="+pos);
        // console.log("Pairs="+Pairs);
        // for(var i=0;i<9;i++){
        //     console.log("[pos]"+Ori_opened[i]);
        // }
        // for(var i=0;i<9;i++){
        //     console.log("[meme]"+Meme_opened[i]);
        // }
        document.getElementById("Scenario").setAttribute("data-name","0");
    }
}

function judgeNetmeme(e){
   
}


//�l�g�~����������
function canvasNetMeme(e){
	//�l�g�~���{�^���������ꂽ�Ƃ�
    selIndex=document.getElementById("selIndex").getAttribute("data-name");
    pos=document.getElementById("pos").getAttribute("data-name");
    c1=document.getElementById("c1").getAttribute("data-name");
    c2=document.getElementById("c2").getAttribute("data-name");
    if (c1 == c2) {
        if(Pairs>selIndex){
            Ori_opened[selIndex] = true;
        } else {
            Meme_opened[selIndex-Pairs] = true;
        }
        if(Pairs>pos){
            Ori_opened[pos] = true;
        } else {
            Meme_opened[pos-Pairs] = true;
        }
        
        selIndex = -1;
        score += 2;
        $("score").innerHTML = "SCORE: " + score;
        memeIndex=0;
        drawStage();
        // �N���A����
        if (Clear(Ori_opened)==1) {
            setTimeout(function () {
                alert("GAME CLEAR!");
                clearTimeout(timer);
                initGame();
            },1);
        }
        //$("nice").play();
    } else {
        // �ԈႢ�I1�b�����J�[�h���v���C���[�Ɍ�����
        score -= 1;
        $("score").innerHTML = "SCORE: " + score;
        memeIndex=0;
        lock = true;
        setTimeout(function () {
            if(Pairs>pos){
                Ori_opened[pos] = false;
            } else {
                Meme_opened[pos-Pairs] = false;
            }
            selIndex = -1;		// 1���ڂ̃J�[�h�𖢑I����
            drawStage();	// �X�e�[�W��`��
            lock = false;
        },1000);
        //$("ng").play();
    }
    document.getElementById("Scenario").setAttribute("data-name","0");

}

//Not�l�g�~����������
function canvasNotNetMeme(e){
	memeIndex = -1;
	console.log("Netmeme=" + memeIndex);
	//clickCard(pos);
}


// �^�C�}�[�̃J�E���g�_�E��
function countTime() {
	if (score >= ROWS * COLS) return;
	time--;
	$("time").innerHTML = "TIME: " + time;
	// �^�C���A�b�v
	if (time <= 0) {
		alert("TIME UP...GAME OVER");
		clearTimeout(timer);
		initGame();
		return;
	}
	// ����^�C�}�[�̐ݒ�
	timer = setTimeout(countTime, 1000);
}

// �摜��ǂݍ��ފ֐�
function loadImage(fname, onload) {
	var image = new Image();
	image.src = fname;
	image.onload = onload;
	return image;
}
		
// ���������p�֐�
function rand(n) {
	return Math.floor(Math.random() * n);
}		

// DOM�v�f��Ԃ�
function $(id) {
	return document.getElementById(id);
}

//�N���A����֐�
function Clear(Ori_opened){
	for(var i=0;i<Pairs;i++){
		if(Ori_opened[i]==0) return 0;
	}
	return 1;
}