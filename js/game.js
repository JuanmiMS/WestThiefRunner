function startGame() {
    myGameArea.start();
    myGamePiece = new component(50, 50, "red", 50, myGameArea.canvas.height-50);
    myObstacle = new component(10, 60, "green", 300, myGameArea.canvas.height-60);
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
var myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 640;
            this.canvas.height = 470;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.update();
    myObstacle.update();


}

function jump(num) {
    var index = 0;
    while (index <= num){
        myGamePiece.y +=1;
        index++;
    }
    while (index >= 0){
        myGamePiece.y -=1;
        index--;
    }

}

//Detectar la pulsación de la barra espaciadora (código 32)
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode === '32') {
        jump(20);
    }

}
