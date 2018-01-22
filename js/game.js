var myGamePiece;
var jumping = false;
var onAir = false;

function startGame() {
    myGamePiece = new component(30, 30, "imgs/pj.png", 30, 240, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;      
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.gravity = 4;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            if (onAir == false){
                this.image.src = "imgs/pj.png";
            }
            else{
                this.image.src = "imgs/pj2.png";
            }
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
          } else {
              ctx.fillStyle = color;
              ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function() {
        this.x += this.speedX;
        this.jumpTest();         
        this.hitBottom();
    };
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            onAir = false;
        }
    }
    this.jumpTest = function (){
        if (this.y > 140 && jumping == true){
            this.y -= this.gravity;
            
        }
        else{
            jumping = false;
            this.y += this.gravity;
        }
    }
    }


function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

//Detectar la pulsación de la barra espaciadora (código 32)

//Refactorizar
document.onkeydown = checkKey;
document.onkeyup = checkKey2;
//document.onkeyup = accelerate(0.1);

function checkKey(e) {

    e = e || window.event;
    document.getElementById('redbutton').src="imgs/btn1.png";
    if (e.keyCode == '32' && onAir == false) {
        
        jumping = true;
        onAir = true;

    }
}

function checkKey2(){
    document.getElementById('redbutton').src="imgs/btn0.png";
}
//Hasta aquí