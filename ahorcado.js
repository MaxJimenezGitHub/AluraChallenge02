;(function(){
// 'use strict'

let palabras = ['ALURA','ORACLE','JAVASCRIPT','CANVAS','TECNOLOGIA','AFINIDAD','PROGRAMAR','DESARROLLADOR'];
const EGanado = 8;
const EPerdido = 1;
const Perdiste = 1;
const formato = /[^A-ZÑ]/i; // /[^A-ZÑ]/g /[*A-ZÑ]/

/* var juego = {
    palabra: 'ALURA',
    estado: 7,
    adivinado: ['A','L'],
    errado: ['Z','O','E','C']    
} */

var juego = null;
var finalizado = false;
var msjFinJG = document.getElementById('msjFin');
var alerta = document.getElementById('alerta');
var tablero = document.querySelector(".tableroJuego");
var configJuego = document.querySelector(".configJuego");
var agregarPalabra = document.querySelector(".agregarPalabra");
const teclaMob = document.getElementById('mobTexto');

var $html = {
    hombre: document.getElementById('hombre'),
    adivinado: document.querySelector('.adivinado'),
    errado: document.querySelector('.errado')
}

//para mobiles
/* const myKey = (e) => {    
    //tiene que existir un juego iniciado
    if(juego != null){
        var letra = e.key;    
        letra = letra.toUpperCase();
         
        if(formato.test(letra)){       
            return;
        }
        adivinar(juego, letra);        
        dibujar(juego);
    }
    teclaMob.value = '';
    teclaMob.focus();  
} */

//para mobiles y entrada de teclado
window.addEventListener('keypress', validarLetra);

function validarLetra(e) {
    let letraInput = e.key;
    let letra = letraInput.toUpperCase();
    if(juego != null){                 
        if(formato.test(letra)){       
            return;
        }
        adivinar(juego, letra);        
        dibujar(juego);
    }    
}

function dibujar(juego){    
    //ruta imagen
    var $elem;
    $elem = $html.hombre;
    var estado = juego.estado;
    if(estado == EGanado){
        estado = juego.previo;
    }

    $elem.src = './img/estados/0' + estado + '.png';
        
    //letras a adivinar
    var palabra = juego.palabra;
    var adivinado = juego.adivinado;
    $elem = $html.adivinado;
    //borrar lo anterior
     $elem.innerHTML = '';
    for(let letra of palabra){
        let $span = document.createElement('span');
        let $txt = document.createTextNode('');
        if(adivinado.indexOf(letra) >= 0){
            $txt.nodeValue = letra;
        }
        $span.setAttribute('class','letra adivinada');
        $span.appendChild($txt);
        $elem.appendChild($span);
    }

    //letras erradas
    var errado = juego.errado;
    $elem = $html.errado;
    //borrar lo anterior
    $elem.innerHTML = '';
    for(let letra of errado){
        let $span = document.createElement('span');
        let $txt = document.createTextNode(letra);
        $span.setAttribute('class','letra errada');
        $span.appendChild($txt);
        $elem.appendChild($span);
    }

    //pintar los mensajes segun estado
    var miEstado = juego.estado;
        if (miEstado == EGanado && !finalizado){                
            mensajes(0,juego.palabra); 
            finalizado = true;       
        }    
        else if(miEstado == EPerdido && !finalizado){
            mensajes(1,juego.palabra);
            finalizado = true;      
        }
}

function adivinar(juego, letra){
    //console.log(letra);
    alert(letra);
    var estado = juego.estado;
    //si perdio o gano
    if(estado == EPerdido || estado == EGanado){
        return;
    }

    var adivinado = juego.adivinado;
    var errado = juego.errado;    
    //si adivino o erro la letra
    if(adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){
        return;
    }

    var palabra = juego.palabra;
    //si la letra esta en la palabra
    if(palabra.indexOf(letra) >= 0){
        let ganado = true;
        //revisar estado ganado
        for(let l of palabra){
            if(adivinado.indexOf(l) < 0 && l != letra){
                ganado = false;
                juego.previo = juego.estado;
                break;
            }
        }
        //si ya ganamos lo indicamos
        if(ganado){
            juego.estado = EGanado;
        }
        //agregar letra a lista de letras adivinadas
        adivinado.push(letra);    
    }else{
        //acercar a la horca
        juego.estado--;
        //letra a la lista de erradas
        errado.push(letra);
    }    
}

function palabraAleatoria(){
    // var indice = Math.round(Math.random() * palabras.length); //a veces falla el random de esta forma
    var indice = ~~(Math.random() * palabras.length);
    //console.log(indice);
    return palabras[indice];
}

function mensajes(tipo, palabra){    
    if(tipo == Perdiste){
        //alert('Fallaste, el acertijo era: ' + palabra);
        document.getElementById('lblMensaje').innerHTML = 'Fallaste, el acertijo era: ' + palabra;
    }
    else{
        //alert('Felicidades has acertado');
        document.getElementById('lblMensaje').innerHTML = 'Felicidades has acertado';
    }
    msjFinJG.classList.add('mostrar');    
    alerta.classList.add('mostrar');
}

window.nuevoJuego = function nuevoJuego(){    
    finalizado = false;
    msjFinJG.classList.remove('mostrar');
    alerta.classList.remove('mostrar');
    var aleatoria = palabraAleatoria();    
    juego = {};
    juego.palabra = aleatoria;
    juego.estado = 7;
    juego.adivinado = [];
    juego.errado = [];
    //console.log(juego);
    dibujar(juego);
}

/* window.onkeypress = function adivinarLetra(e){    
    //tiene que existir un juego iniciado
    if(juego != null){
        var letra = e.key;    
        letra = letra.toUpperCase();
         
        if(formato.test(letra)){       
            return;
        }
        adivinar(juego, letra);        
        dibujar(juego);
    }
} */

function regresarInicio(){
    tablero.classList.remove('mostrar'); 
    agregarPalabra.classList.remove('mostrar');
    configJuego.classList.add('mostrar');
    document.getElementById("txtTexto").value = "";
}

window.rendirse = function abandonarJuego(){          
    regresarInicio();
    console.log("salir del juego");
}

window.agregar = function incluirPalabra(){
    tablero.classList.remove('mostrar'); 
    configJuego.classList.remove('mostrar');
    agregarPalabra.classList.add('mostrar');
    console.log("agregar palabra");    
}

window.iniciarJuego = function crearJuego(){
    tablero.classList.add('mostrar');
    configJuego.classList.remove('mostrar');    
    console.log("nuevo juego");
    nuevoJuego();
    //para mobile
    let visibleTeclado = teclaMob.style.display;
    if(visibleTeclado != 'none'){
        teclaMob.focus();
        //teclaMob.addEventListener("keyup", myKey);
    }
}

window.cancPalabra = function cancelarPalabra(){
    regresarInicio();    
    console.log("cancelar nueva palabra");
}

window.nuevaPalabra = function iniciarPalabra(data){
    console.log("nuevo tablero de juego");
    tablero.classList.add('mostrar');
    configJuego.classList.remove('mostrar');
    agregarPalabra.classList.remove('mostrar');
    if (data.length > 0){
        if(!palabras.includes(data)){
            palabras.push(data);
            console.log("se agrega nueva palabra"); 
        }else{
            console.log("la palabra ya esta en la lista"); 
        }
    }    
    //iniciar
    nuevoJuego();
}

}())
