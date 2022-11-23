// ネトミム
// ----------------------------------------
// 定数
var Ori_RESOURCE_FILE = "Neta_minixmini.png"; //元ネタ画像集
var Meme_RESOURCE_FILE= "Meme_minixmini.png"; //ミーム画像集
var NetMemeBottom_FILE= "bg1.jpg"; 
var NotNetMemeBottom_FILE="bg1,jpg";
var Pairs=9;       //ペアの組数
var ROWS=3;			//ステージの行数
var COLS=3;			//ステージの列数
var CARD_H = 142;	// カードの高さ
var CARD_W = 142;	// カードの幅
var DEFAULT_TIME = 180;	// 残り時間

// 変数
var Ori_cards = [];	// 元ネタカードの番号を記録
var Meme_cards= []; // ミームカードの番号を記録
var Ori_opened = [];// 元ネタカードを開いたかどうかを記録
var Meme_opened= [];// ミームカードを開いたかどうかを記録
var Ori_resImage;   // 元ネタが読み込まれる場所
var Meme_resImage;  // ミームが読み込まれる場所
var Bottom_resImage; // ネトミムボタン格納場所
var NotBottom_resImage; // Notネトミムボタン格納場所
var ctx;        // 2Dグラフィック処理用
var ctx2;		//ネトミムボタン処理用
var ctx3;		//Notネトミムボタン処理用
var selIndex;	// プレーヤーの選択した値
var memeIndex;	//ネトミムボタン判定値
var stopper;    // ネトミムボタンが押下の判定
var score;		// スコア
//var clear;		//ゲームクリア
var time;		// 残り時間
var lock;		// 連続リクック防止用
var timer;		// タイマー


// 初期化処理
window.onload = function () {
	// 描画コンテキストの取得
	var canvas = $("mainCanvas");
	var canvas2 = $("bottomCanvas");
	//var canvas3 = $("Not_bottomCanvas");
	ctx = canvas.getContext("2d");
	ctx2 = canvas2.getContext("2d");
	//ctx3 = canvas3.getContext("2d");
    canvas.onmousedown = canvasMDHandler; //カードをクリックした後の処理
    canvas2.onmousedown = canvasNetMeme;
	// 画像ファイルの読み込み
	Ori_resImage = loadImage(Ori_RESOURCE_FILE, function () {
		initGame();
	});
    Meme_resImage = loadImage(Meme_RESOURCE_FILE, function() {
        initGame();
    })
}

// ゲームの初期化
function initGame() {
	selIndex = -1;	// 未選択
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


// カードを初期化してシャッフルする
function initCards() {
	// 10ペアのカード20枚を配列に代入
    // 元ネタ（ミーム）カード10枚を元ネタ(ミーム）用配列に代入
	for (var i = 0; i < Pairs; i++) {
		Ori_cards[i] = i+1;
        Meme_cards[i] = i+1;
	}
	for (var i = 0; i < Ori_cards.length; i++) {
		Ori_opened[i] = false;
        Meme_opened[i]= false;
	}
    

	// シャッフルする
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


// ステージを描画する
function drawStage() {
	// カードを一枚ずつ描画する
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

// マウスでカードを選んだ時のイベント
function canvasMDHandler(e) {
	// クリックした位置を得る
	var x = e.clientX;
	var y = e.clientY;
	var r = e.target.getBoundingClientRect();
	x -= r.left;
	y -= r.top;
	// どの位置のカードをクリックしたか判定
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

// プレイヤーがカードを選んだときの処理
function clickCard(pos) {
	// 既にオープンしたカードなら何もしない
    if(document.getElementById("Scenario").getAttribute("data-name") =='0'){
        if(Pairs>pos){
            if (Ori_opened[pos]) return;
        } else {
            if (Meme_opened[pos-Pairs]) return;
        } 
        if (pos==-1) return;
        if (lock) return;
        // 1枚目の選択か
        if (selIndex < 0) {
            //元ネタかミームカードか
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
        //二枚目
	    if (pos == selIndex) return;
	    // 選択した2枚が合致するか？
        var c1,c2;
        if(Pairs>selIndex){
            //一枚目が元ネタ
            c1 = Ori_cards[selIndex];
            if(Pairs>pos){
                //二枚目が元ネタ
                c2 = Ori_cards[pos];
                Ori_opened[pos] = true;
                Ori_drawStage();
            } else {
                //二枚目がミーム
                c2 = Meme_cards[pos-Pairs];
                Meme_opened[pos-Pairs] = true;
                var t = selIndex;
                selIndex =-1;
                Meme_drawStage();
                selIndex = t;
            }
        } else {
            //一枚目がミーム
            c1 = Meme_cards[selIndex-Pairs];
            if(Pairs>pos){
                //二枚目が元ネタ
                c2 = Ori_cards[pos];
                Ori_opened[pos] = true;
                Ori_drawStage();
            } else {
                //二枚目がミーム
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
            //ネトミムボタンが押されたとき
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
                // クリア判定
                if (Clear(Ori_opened)==1) {
                    setTimeout(function () {
                        alert("GAME CLEAR!");
                        clearTimeout(timer);
                        initGame();
                    },1);
                }
                $("nice").play();
            } else {
                // 間違い！1秒だけカードをプレイヤーに見せる
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
                    selIndex = -1;		// 1枚目のカードを未選択に
                    drawStage();	// ステージを描画
                    lock = false;
                },1000);
                $("ng").play();
            }
        } else {
            //ネトミムチャレンジしないとき
            lock = true;
            setTimeout(function () {
                if(Pairs>pos){
                    Ori_opened[pos] = false;                
                } else {
                    Meme_opened[pos-Pairs] = false;
                }
                selIndex = -1;		// 1枚目のカードを未選択に
                drawStage();	// ステージを描画
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


//ネトミムを押下時
function canvasNetMeme(e){
	//ネトミムボタンが押されたとき
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
        // クリア判定
        if (Clear(Ori_opened)==1) {
            setTimeout(function () {
                alert("GAME CLEAR!");
                clearTimeout(timer);
                initGame();
            },1);
        }
        //$("nice").play();
    } else {
        // 間違い！1秒だけカードをプレイヤーに見せる
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
            selIndex = -1;		// 1枚目のカードを未選択に
            drawStage();	// ステージを描画
            lock = false;
        },1000);
        //$("ng").play();
    }
    document.getElementById("Scenario").setAttribute("data-name","0");

}

//Notネトミムを押下時
function canvasNotNetMeme(e){
	memeIndex = -1;
	console.log("Netmeme=" + memeIndex);
	//clickCard(pos);
}


// タイマーのカウントダウン
function countTime() {
	if (score >= ROWS * COLS) return;
	time--;
	$("time").innerHTML = "TIME: " + time;
	// タイムアップ
	if (time <= 0) {
		alert("TIME UP...GAME OVER");
		clearTimeout(timer);
		initGame();
		return;
	}
	// 次回タイマーの設定
	timer = setTimeout(countTime, 1000);
}

// 画像を読み込む関数
function loadImage(fname, onload) {
	var image = new Image();
	image.src = fname;
	image.onload = onload;
	return image;
}
		
// 乱数生成用関数
function rand(n) {
	return Math.floor(Math.random() * n);
}		

// DOM要素を返す
function $(id) {
	return document.getElementById(id);
}

//クリア判定関数
function Clear(Ori_opened){
	for(var i=0;i<Pairs;i++){
		if(Ori_opened[i]==0) return 0;
	}
	return 1;
}