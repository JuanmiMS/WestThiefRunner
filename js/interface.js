
var finalScore = 0;
var nextPunt = "unidades";
var img = [];
i = 0;
x = 0;
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

function changeIntToImg() {
	setTimeout("changeIntToImg()", 1000);
    sumPoints();

    document.getElementById(nextPunt).src = img[x];
    x++;

    if(x == img.length){
        nextPunt = "decenas";
        x = 0;
    }

}

function startNext(){

}

