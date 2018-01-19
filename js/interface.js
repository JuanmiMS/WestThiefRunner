
//FIXIT Andrés!!
var img = [];
x = 0;
img[0] = "imgs/1.png";
img[1] = "imgs/2.png";
img[2] = "imgs/3.png";

function changeImage()
{
    var imagen = document.getElementById("pos1").src = img[x];
    x++;

    if(x == img.length){
        x = 0;
    } 

    setTimeout("changeImage()", 1000);
}

setTimeout("changeImage()", 1000);
//Hasta aquí :D

function pictureChange(){
    document.getElementById('redbutton').src="imgs/btn1.png";
}
