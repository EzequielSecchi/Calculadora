const pantalla = document.querySelector('.resultado');
const botones = document.querySelectorAll('h2');

var hayresultado = false;
var resultadoanterior = 0;

pantalla.textContent = "0";

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        if (boton.classList.contains("reset")){
            pantalla.textContent = "0";
        }else if (boton.classList.contains("igual")){
            try {
                pantalla.textContent = eval(pantalla.textContent);
                hayresultado = true;
                resultadoanterior = eval(pantalla.textContent);
            } catch (error) {
                pantalla.textContent = "Error";
            }
        }else if (boton.classList.contains("diezpor")){
            pantalla.textContent += "*10**";
        }else if(boton.classList.contains("borrar")){
            if(pantalla.textContent.length === 1 || (pantalla.textContent.length === 2 && pantalla.textContent.startsWith("-"))){
                pantalla.textContent = "0";
            }else{
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
        }else if(boton.classList.contains("ANS")){
            pantalla.textContent += resultadoanterior;
        }
        else{
            const texto = boton.textContent.trim();
            if (hayresultado) {
                pantalla.textContent = texto;
                hayresultado = false;
            } else {
                if (pantalla.textContent === "0") {
                    pantalla.textContent = texto;
                } else {
                    pantalla.textContent += texto;
                }
            }
        }
    });
});