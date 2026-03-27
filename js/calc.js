const pantalla = document.querySelector('.resultado');
const botones = document.querySelectorAll('.basecalculadora h2');
const modonoche = document.querySelector('.modonoche');
const conversor = document.querySelector('.conversor-titulo');
const opciones = document.querySelectorAll('.conversor h3');
const conversorLongitud = document.querySelector('.longitud');
const longitudConversor = document.querySelector('.longitud-conversor');
const longitudInput = document.querySelector('.longitud-input');
const longitudUnidades = document.querySelector('.longitud-unidades');
const longitudBoton = document.querySelector('.longitud-convertir');
const longitudResultado = document.querySelector('.longitud-resultado');

var hayresultado = false;
var resultadoanterior = 0;

pantalla.textContent = "0";

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        if (boton.classList.contains("reset")){
            pantalla.textContent = "0";
        }
        
        else if (boton.classList.contains("igual")){
            try {
                pantalla.textContent = eval(pantalla.textContent);
                hayresultado = true;
                resultadoanterior = eval(pantalla.textContent);
            } catch (error) {
                pantalla.textContent = "Error";
            }
        }
        
        else if (boton.classList.contains("diezpor")){
            pantalla.textContent += "*10**";
            hayresultado = false;
        }
        
        else if(boton.classList.contains("borrar")){
            if(pantalla.textContent.length === 1 || (pantalla.textContent.length === 2 && pantalla.textContent.startsWith("-"))){
                pantalla.textContent = "0";
            }else if (hayresultado){
                pantalla.textContent = "0";
                hayresultado = false;
            }else{
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
        }
        
        else if(boton.classList.contains("ANS")){
            if(hayresultado){
                pantalla.textContent = resultadoanterior;
                hayresultado = false;
            }else{
                pantalla.textContent += resultadoanterior;
            }
        }
        
        else{
            const texto = boton.textContent.trim();
            if (hayresultado && !boton.classList.contains("suma") && !boton.classList.contains("resta") && !boton.classList.contains("multiplicado") && !boton.classList.contains("dividido")){
                pantalla.textContent = texto;
                hayresultado = false;
            } else {
                if (pantalla.textContent === "0") {
                    pantalla.textContent = texto;
                    hayresultado = false;
                } else {
                    pantalla.textContent += texto;
                    hayresultado = false;
                }
            }
        }
        new Audio('sonidos/mouse-click-sound-effect.mp3').play();
    });
});


modonoche.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
});

function convertirLongitud(valor, unidad) {
    const factores = {
        metros: 1,
        kilometros: 1000,
        millas: 1609.34,
        pies: 0.3048
    };

    const valorEnMetros = valor * factores[unidad];

    return {
        metros: valorEnMetros,
        kilometros: valorEnMetros / factores.kilometros,
        millas: valorEnMetros / factores.millas,
        pies: valorEnMetros / factores.pies
    };
}

longitudBoton.addEventListener("click", () => {
    const valor = parseFloat(longitudInput.value);
    const unidad = longitudUnidades.value;

    if (Number.isNaN(valor)) {
        longitudResultado.textContent = "Ingrese un número válido";
        return;
    }

    const resultados = convertirLongitud(valor, unidad);

    const etiquetas = {
        metros: "metros",
        kilometros: "kilómetros",
        millas: "millas",
        pies: "pies"
    };

    longitudResultado.textContent =
        `${valor} ${etiquetas[unidad]} equivalen a:\n` +
        `${resultados.metros.toFixed(4)} metros · ` +
        `${resultados.kilometros.toFixed(4)} kilómetros · ` +
        `${resultados.millas.toFixed(4)} millas · ` +
        `${resultados.pies.toFixed(4)} pies`;
});

conversor.addEventListener("click", () => {
    opciones.forEach(opcion => {
        opcion.classList.toggle("visible");
    });
    if (!opciones[0].classList.contains("visible")) {
        longitudConversor.classList.remove("visible");
    }
});

conversorLongitud.addEventListener("click", (event) => {
    event.stopPropagation();
    longitudConversor.classList.toggle("visible");
});