var GAME_VERSION = "ALPHA-0.6";
var myGamePiece;
var playing = true;
var myObstacles = [];
var jumping = false;
var onAir = false;
var gameSpeed = 4;
var TotalPoints = 0;

function startGame() {
    
    myGamePiece = new component(51, 61, "imgs/pj.png", 30, 240, "pj");
    //grosor, altura total, color, posX, PosY
    myObstacle = new component(64, 64, "imgs/cactus.png", 300, 240, "cactus"); 
    myGameArea.start();
    puntuation();
    
}
function restart() {
    //Reiniciamos los obstáculos y los puntos
    myObstacles = [];
    TotalPoints = 0
    myGameArea.stop();
    myGameArea.clear();
    startGame();
    z = 0;
y = 0;
x = 0;
document.getElementById("unidades").src = "imgs/0.png";
document.getElementById("decenas").src= "imgs/0.png";
document.getElementById("centenas").src= "imgs/0.png";
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        
        this.canvas.width = 600;
        this.canvas.height = 390; 
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;  
        this.interval = setInterval(updateGameArea, 20);
        
    },
    stop : function() {
        clearInterval(this.interval);
        endGame();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function endGame(){
       playing = false;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "pj") {
        this.image = new Image();
        this.image.src = color;  
    }
    else if (type == "cactus") {
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
        //Salto
        if (type == "pj") {
            if (onAir == false){
                this.image.src = "imgs/pj.png";
            }
            else{
                this.image.src = "imgs/pj2.png";
            }
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } 
        else if (type == "cactus"){
            //console.log("entraa");
            this.image.src = "imgs/cactus.png";
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
            
          else {
              ctx.fillStyle = color;
              ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        //Fin salto

        if (type == "cactus") {
            this.image.src = "imgs/cactus.png";
            //console.log("entra");
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
        if (this.y > 230 && jumping == true){
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
    //Si pones aquí la función de bg, cuando puedes sale la imagen D:
      
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
        setBackground("imgs/bg.png");
        //oldTV("imgs/old.png");
        myGameArea.frameNo += 1;

        function everyinterval(n) {
            if ((myGameArea.frameNo / n) % 1 == 0) {
                //console.log("intervalo True");
                
                return true;
            }
            //console.log("intervalo False");
            return false;
        }

        if (everyinterval(60) ){
            x = myGameArea.canvas.width;
            y = getRandomNum();
            //cada vez que sale un obj suma 1 a la puntuación
            puntuation();
            //sumGameSpeed(TotalPoints);
            myObstacles.push(new component(30, 64, "imgs/obstaculo.png", myGameArea.canvas.width, y, "cactus"));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x -= gameSpeed;
            
            myObstacles[i].update();
        }
    
    myGamePiece.newPos();
    myGamePiece.update();
    }
}

function getRandomNum(){
    //Recordar que los números es la inversa por que es la distancia desde arriba!
    var max = 360;
    var min = 335;
    /*var max = 100;
    var min = 1;*/
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Distancia entre los obstaculos
function getObstacles() {
    return ran;
}

function sumGameSpeed(TotalPoints){
    if (TotalPoints%10==0){
        gameSpeed += 1;
        console.log(gameSpeed);
    }
    
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
function oldTV(bg){
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
function checkKey(e) {

    e = e || window.event;
    document.getElementById('redbutton').src="imgs/btn1.png";
    if (e.keyCode == '32' && onAir == false) {      
        jumping = true;
        onAir = true;
    }
    if (e.keyCode == '82') {      
        restart();
    }
}

function checkKey2(){
    document.getElementById('redbutton').src="imgs/btn0.png";
}
//Hasta aquí
