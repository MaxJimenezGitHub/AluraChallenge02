;(function(){
    'use strict'

var juego = {
    palabra: 'ALURA',
    estado: 1,
    adivinado: ['A','L'],
    errado: ['B','J','K','C']
}

var $html = {
    hombre: document.getElementById('hombre'),
    adivinado: document.querySelector('.adivinado'),
    errado: document.querySelector('.errado')
}

function dibujar(pJuego){
    let $span;
    let $txt;
    //ruta imagen
    var $elem = $html.hombre;
    $elem.src = './img/estados/0' + pJuego.estado + '.png';
    //letras a adivinar
    var palabra = juego.palabra;
    var adivinado = juego.adivinado;
    $elem = $html.adivinado;
    for(let letra of palabra){
        $span = document.createElement('span');
        $txt = document.createTextNode('');
        if(adivinado.indexOf(letra)>=0){
            $txt.nodeValue = letra;
        }
        $span.setAttribute('class','letra adivinada');
        $span.appendChild($txt);
        $elem.appendChild($span);
    }
    //letras erradas
    var errado = juego.errado;
    $elem = $html.errado;
    for(let letra of errado){
        $span = document.createElement('span');
        $txt = document.createTextNode(letra);
        $span.setAttribute('class','letra errada');
        $span.appendChild($txt);
        $elem.appendChild($span);
    }
}
dibujar(juego);
//console.log(juego)
}())
