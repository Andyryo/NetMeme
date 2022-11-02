// �_�o����
// ----------------------------------------
// �萔
var RESOURCE_FILE = "Preresource.png";
var ROWS = 4;		// �X�e�[�W�̍s��
var COLS = 5;		// �X�e�[�W�̗�
var CARD_H = 120;	// �J�[�h�̍���
var CARD_W = 80;	// �J�[�h�̕�
var DEFAULT_TIME = 200;	// �c�莞��
// �ϐ�
var cards = [];	// �J�[�h�̔ԍ����L�^
var opened = [];	// �J�������ǂ������L�^
var resImage;
var ctx;
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
	canvas.onmousedown = canvasMDHandler;
	// �摜�t�@�C���̓ǂݍ���
	resImage = loadImage(RESOURCE_FILE, function () {
		initGame();
	});
};

// �Q�[���̏�����
function initGame() {
	selIndex = -1;	// ���I��
	score = 0;
	time = DEFAULT_TIME;
	$("score").innerHTML = "SCORE: O";
	initCards();
	drawStage();
	countTime();
}


// �J�[�h�����������ăV���b�t������
function initCards() {
	// 10�y�A�̃J�[�h20����z��ɑ��
	for (var i = 0; i < ROWS * COLS; i++) {
		cards[i] = 1 + Math.floor(i / 2);
	}
	for (var i = 0; i < cards.length; i++) {
		opened[i] = false;
	}
	// �V���b�t������
	for (var i = 0; i < cards.length; i++) {
		var r = rand(cards.length);
		var tmp = cards[i];
		cards[i] = cards[r];
		cards[r] = tmp;
	}
}


// �X�e�[�W��`�悷��
function drawStage() {
	// �J�[�h���ꖇ���`�悷��
	for (var i = 0; i < cards.length; i++) {
		var no = cards[i];
		if (opened[i] == false && selIndex != i) {
			no = 0;
		}
		var row = Math.floor(i / COLS);
		var col = i % COLS;
		var y = CARD_H * row;
		var x = CARD_W * col;
		ctx.drawImage(resImage,
			no * CARD_W, 0 , CARD_W, CARD_H,
			x, y, CARD_W, CARD_H);
		// �v���C���[���I�𒆂Ȃ�F������
		if (selIndex == i) {
			ctx.strokeSty1e = "rgba(255,100,100,0.5)";
			ctx.lineWidth = 2;
			ctx.strokeRect(x+2, y+2, CARD_W-4, CARD_H-4);
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
	pos = col + row *COLS;
	console.log("click=" + pos);
    $("result1").innerHTML=pos;
	clickCard(pos);
}

// �v���C���[���J�[�h��I�񂾂Ƃ��̏���
function clickCard(pos) {
	// ���ɃI�[�v�������J�[�h�Ȃ牽�����Ȃ�
	if (opened[pos]) return;
	if (lock) return;
	// 1���ڂ̑I����
	if (selIndex < 0) {
		selIndex = pos;
		drawStage();
		return;
	}
	// 2���ڂ̑I��
	if (pos == selIndex) return;
	// �I������2�������v���邩�H
	var c1 = cards[selIndex];
	var c2 = cards[pos];
	if (c1 == c2) {
		opened[selIndex] = true;
		opened[pos] = true;
		selIndex = -1;
		score += 2;
		$("score").innerHTML = "SCORE: " + score;
		drawStage();
		// �N���A����
		if (score >= cards.length) {
			setTimeout(function () {
				alert("GAME CLEAR!");
				clearTimeout(timer);
				initGame();
			},1);
		}
		$("nice").play();
	} else {
		// �ԈႢ�I1�b�����J�[�h���v���C���[�Ɍ�����
		opened[pos] = true;	// pos�̃J�[�h��\�����ɃZ�b�g
		drawStage();	// �X�e�[�W��`��
		lock = true;
		setTimeout(function () {
			opened[pos] = false;	// �J�[�h�𗠌����ɖ߂�
			selIndex = -1;		// 1���ڂ̃J�[�h�𖢑I����
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