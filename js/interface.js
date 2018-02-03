
//Imagen de cada numero para la puntuación
var img = [];
z = 0;
y = 0;
x = 0;
img[0] = "imgs/0.png";
img[1] = "imgs/1.png";
img[2] = "imgs/2.png";
img[3] = "imgs/3.png";
img[4] = "imgs/4.png";
img[5] = "imgs/5.png";
img[6] = "imgs/6.png";
img[7] = "imgs/7.png";
img[8] = "imgs/8.png";
img[9] = "imgs/9.png";


function puntuation() {
        /* Si la primera posicion llega a 10, se inicia a 0 y se suma 1 a la siguiente 
        y así sucesivamente hasta 3 posiciones */
        //Primera posición, unidades.
        if(z!=10){
            document.getElementById("unidades").src = img[x];
            
            if(x == 10){
                y++;
                document.getElementById("unidades").src = img[0];
                document.getElementById("decenas").src = img[y];
                x=0;
            }
            //Segunda posicion, decenas
            if(y == 10 && playing){
                z++;
                document.getElementById("decenas").src = img[0];
                document.getElementById("centenas").src = img[z];
                x=0;
                y=0;
                
            }
            //Tercera posición, centenas.
            if(z == 10 && playing){
                document.getElementById("centenas").src = img[z];
            }
            x++;
        }else{
            //Si llega a la puntuación máxima 999, salta un mensaje.
            alert("¡Ereh un makina premoh!");
        }       
}

