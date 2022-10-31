// �l�g�~��
// ----------------------------------------
// �萔
var Ori_RESOURCE_FILE = "Neta_minixmini.png"; //���l�^�摜�W
var Meme_RESOURCE_FILE= "Meme_minixmini.png"; //�~�[���摜�W

//Ori_RESOURCE_FILE.height = 128;
//Meme_RESOURCE_FILE.height = 128;

var Pairs=12;       //�y�A�̑g��

var ROWS=4;
var COLS=3;
//var Ori_ROWS=4;     //���l�^�X�e�[�W�̍s��
// var Ori_COLS=5;     //���l�^�X�e�[�W�̗�
// var Meme_ROWS=4;    //�~�[���X�e�[�W�̍s��
// var Meme_COLS=5;    //�~�[���X�e�[�W�̗�


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
var ctx;        // 2D�O���t�B�b�N�����p
var selIndex;	// �v���[���[�̑I�������l
var score;		// �X�R�A
var time;		// �c�莞��
var lock;		// �A�����N�b�N�h�~�p
var timer;		// �^�C�}�[

// ����������
window.onload = function () {
	// �`��R���e�L�X�g�̎擾
	var canvas = $("mainCanvas");
	ctx = canvas.getContext("2d");
	canvas.onmousedown = canvasMDHandler; //�J�[�h���N���b�N������̏���
	// �摜�t�@�C���̓ǂݍ���
	Ori_resImage = loadImage(Ori_RESOURCE_FILE, function () {
		initGame();
	});
    Meme_resImage = loadImage(Meme_RESOURCE_FILE, function() {
        initGame();
    })
};

// �Q�[���̏�����
function initGame() {
	selIndex = -1;	// ���I��
	score = 0;
	time = DEFAULT_TIME;
	$("score").innerHTML = "SCORE: 0";
	initCards();
	drawStage();
	countTime();
    //$("result1").innerHTML = Ori_RESOURCE_FILE.width;
    //$("result2").innerHTML = Ori_RESOURCE_FILE.height;
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
        //var tmp1 =  Meme_cards[i];
        //Meme_cards[i] = Meme_cards[r];
		//Meme_cards[r] = tmp1;
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
            // �v���C���[���I�𒆂Ȃ�F������
		if (selIndex == i) {
			ctx.strokeSty1e = "rgba(255,100,100,0.5)";
			ctx.lineWidth = 2;
			ctx.strokeRect(x+2, y+2, CARD_W-4, CARD_H-4);
		}
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
		
            // �v���C���[���I�𒆂Ȃ�F������
		if (selIndex == i) {
			ctx.strokeSty1e = "rgba(255,100,100,0.5)";
			ctx.lineWidth = 2;
			ctx.strokeRect(x+2, y+2, CARD_W-4, CARD_H-4);
		}
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
            // �v���C���[���I�𒆂Ȃ�F������
		if (selIndex == i) {
			ctx.strokeSty1e = "rgba(255,100,100,0.5)";
			ctx.lineWidth = 2;
			ctx.strokeRect(x+2, y+2, CARD_W-4, CARD_H-4);
		}
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
		
            // �v���C���[���I�𒆂Ȃ�F������
		if (selIndex == i) {
			ctx.strokeSty1e = "rgba(255,100,100,0.5)";
			ctx.lineWidth = 2;
			ctx.strokeRect(x+CARD_W*4+2, y+2, CARD_W-4, CARD_H-4);
		}
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

    console.log("click=" + pos);
    $("result1").innerHTML = pos;
    //$("result1").innerHTML = Ori_cards[pos];
    //$("result2").innerHTML = Meme_cards[pos];
    //��������
	clickCard(pos);
}

// �v���C���[���J�[�h��I�񂾂Ƃ��̏���
function clickCard(pos) {
	// ���ɃI�[�v�������J�[�h�Ȃ牽�����Ȃ�
    if(Pairs>pos){
	    if (Ori_opened[pos]) return;
    } else {
        if (Meme_opened[pos-Pairs]) return;
    }
	if (lock) return;
	// 1���ڂ̑I����
	if (selIndex < 0) {
        //���l�^���~�[���J�[�h��
        if(Pairs>pos){
            selIndex = pos;
            Ori_drawStage();
        } else {
            selIndex = pos-Pairs;
            Meme_drawStage();
            selIndex = pos;
        }
		//selIndex = pos;
		//drawStage();
		return;
	}
	// 2���ڂ̑I��
	if (pos == selIndex) return;
	// �I������2�������v���邩�H
    var c1,c2;
    if(Pairs>selIndex){
        c1 = Ori_cards[selIndex];
    } else {
        c1 = Meme_cards[selIndex-Pairs];
    }

    if(Pairs>pos){
        c2 = Ori_cards[pos];
    } else {
        c2 = Meme_cards[pos-Pairs];
    }
	//var c1 = Ori_cards[selIndex];
	//var c2 = Meme_cards[pos];
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
		//Meme_opened[pos] = true;
		selIndex = -1;
		score += 2;
		$("score").innerHTML = "SCORE: " + score;
		drawStage();
		// �N���A����
		if (score >= Pairs*2) {
			setTimeout(function () {
				alert("GAME CLEAR!");
				clearTimeout(timer);
				initGame();
			},1);
		}
		$("nice").play();
	} else {
		// �ԈႢ�I1�b�����J�[�h���v���C���[�Ɍ�����
        if(Pairs>pos){
            Ori_opened[pos] = true;
            //Ori_drawStage();
            Ori_drawStage();
        } else {
            Meme_opened[pos-Pairs] = true;
            Meme_drawStage();
        }
		//Meme_opened[pos] = true;	// pos�̃J�[�h��\�����ɃZ�b�g
        score -= 1;
		$("score").innerHTML = "SCORE: " + score;
		//drawStage();	// �X�e�[�W��`��
		lock = true;
		setTimeout(function () {
            /*if(Pairs>selIndex){
                Ori_opened[selIndex] = false;
                selIndex = -1;
                //Ori_drawStage();
            } else {
                Meme_opened[selIndex-Pairs] = false;
                selIndex = -1;
                //Meme_drawStage();
            }*/
            if(Pairs>pos){
                Ori_opened[pos] = false;
                selIndex = -1;
                //Ori_drawStage();
            } else {
                Meme_opened[pos-Pairs] = false;
                selIndex = -1;
                //Meme_drawStage();
            }
			//Meme_opened[pos] = false;	// �J�[�h�𗠌����ɖ߂�
			//selIndex = -1;		// 1���ڂ̃J�[�h�𖢑I����
			drawStage();	// �X�e�[�W��`��
			lock = false;
		},1000);
		$("ng").play();
	}
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