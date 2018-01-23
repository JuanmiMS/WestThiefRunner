var myGamePiece;
var myObstacles = [];
var jumping = false;
var onAir = false;
var gameSpeed = 3;
var TotalPoints = 0;

function startGame() {
    myGamePiece = new component(30, 30, "imgs/pj.png", 30, 240, "image");
    //grosor, altura total, color, posX, PosY
    myObstacle = new component(10, myGameArea.canvas.height, "green", 300, 240); 
    myGameArea.start();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270; 
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;  
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
        alert(TotalPoints);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
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
        sumPoints();
        ctx = myGameArea.context;
        //Salto
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
        //Fin salto
        
          
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
        if (this.y > 160 && jumping == true){
            this.y -= this.gravity;
            
        }
        else{
            jumping = false;
            this.y += this.gravity;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
    }


function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        
        myGameArea.stop();
        
    } 
    else {
        var x, y;
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                return;
            } 
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;


        //cambiar 50 por numero random
        if (myGameArea.frameNo == 1 || everyinterval(getRandom())) {
            x = myGameArea.canvas.width;
            y = myGameArea.canvas.height - 200

            //cambiar X por un valor random
            myObstacles.push(new component(10, 200, "green", x, 240));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x -= gameSpeed;
            myObstacles[i].update();
        }
    myGamePiece.newPos();
    myGamePiece.update();
    }
}

//Distancia entre los obstaculos
function getRandom() {
    var max = 80;
    var min = 50;
    var ran = Math.floor(Math.random() * (max - min) + min);
    console.log(ran);
    return ran;
}

function sumPoints(){
    TotalPoints+=1;
}
//Hacer que todo se cargue en el onload...
function setBackground(bg){
    ctx = myGameArea.context;
    var background = new Image();
        background.src = bg;
        ctx.drawImage(background,0,0); 
}

ctx = myGameArea.context;



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