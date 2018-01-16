
var image = document.getElementById('pos1');

function sumScore(){
	image.src = "imgs/3.png"
	setTimeOut(toImage1, 2000);
}
function toImage1(){
	image.src = "imgs/1.png"
	setTimeOut(toImage2, 2000);
}

function toImage2(){
		image.src = "imgs/2.png"
		setTimeOut(toImage3, 3000);
}

function toIimage3(){
		image.src = "imgs/3.png"
		setTimeOut(toImage1, 4000);
}
