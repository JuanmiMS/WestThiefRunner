
var finalScore = 0;
var img = [];
x = 0;
function sumScore(){

    img[0] = "imgs/0.png";
    img[1] = "imgs/1.png";
    img[2] = "imgs/2.png";
    img[3] = "imgs/3.png";
    /**
    img[4] = "imgs/4.png";
    img[5] = "imgs/5.png";
    img[6] = "imgs/6.png";
    img[7] = "imgs/7.png";
    img[8] = "imgs/8.png";
    img[9] = "imgs/9.png";
    **/
}


function changeImage(){

}

function changeIntToImg(any){
function changeIntToImg() {
	setTimeout("changeIntToImg()", 1000);
	finalScore += 1;
    var imagen = document.getElementById("score").src = img[x];
    x++;

    if(x == img.length){
        x = 0;
    }
// Añadir acumulador con la puntuación a enseñar al final
}

function pictureChange(){
	changeIntToImg();
    document.getElementById('redbutton').src="imgs/btn1.png";
}

