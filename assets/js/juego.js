/**
 * 2C = Two of Clubs (dos de tréboles)
 * 2D = Two of Diamonds (dos de diamantes)
 * 2H = Two of Hearts (dos de corazones)
 * 2S = Two of Spades (dos de picas)
 */

let baraja          = [];
const letras        = ['C', 'D', 'H', 'S'];
const especiales    = ['A', 'J', 'K', 'Q'];

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnParar = document.querySelector('#btnParar');
const btnNuevoGame = document.querySelector('#btnNuevo');
let puntosUsuario = 0,
    puntosComputador = 0;
const smallPuntosUsuario = document.querySelector('#smallUsuario'); 
const smallPuntosComputador = document.querySelector('#smallComputador'); 
const divCartasUsuarioImgs = document.querySelector('#jugador-cartas');
const divCartasComputadorImgs = document.querySelector('#computador-cartas');


// Función para la creación de una nueva baraja
const crearBaraja = () => {

    for( i = 2; i <= 10; i++ ) {
        for( let letra of letras ) {
            baraja.push(i + letra);
        }
    }

    for ( let especial of especiales) {
        for ( let letra of letras ) {
            baraja.push(especial + letra);
        }
    }

    baraja = _.shuffle(baraja); // barajear
    return baraja;
}

crearBaraja();

const pedirCarta = () => {
    // carta = baraja.pop();

    if ( baraja.length === 0) {
        throw 'No hay cartas en la baraja.'
    }

    let numDeCartas = []; 
    for ( i = 0;  i <= baraja.length - 1; i++) {
        numDeCartas.push(i);
    }

    numDeCartas = _.shuffle(numDeCartas);

    carta = baraja[numDeCartas[0]];
    
    baraja.splice(numDeCartas[0], 1);

    return carta;
}

// pedirCarta();

// Función para saber qué valor tiene una carta

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Remover la última letra y solo tomar el resto, o sea tomar el primer valor de la carta.

    return (!isNaN(valor)) ? valor * 1 : (valor === 'A') ? 11 : 10; // Retorna los puntos dependiendo de si es un valor númerico o una letra.
}


const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();
        puntosComputador = puntosComputador + valorCarta( carta );
        smallPuntosComputador.textContent = puntosComputador + ' pts';
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.className = 'carta';
        divCartasComputadorImgs.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }


    } while ( ( puntosComputador < puntosMinimos ) && ( puntosMinimos <= 21 ) );


    setTimeout(() => {
        if ( puntosMinimos === puntosComputador ) {
            alert('Hubo un empate')
        } else if ( puntosMinimos > 21 ) {
            alert('Dealer gana')
    
        } else if ( puntosComputador > 21) {
            alert('Ganaste!!');
        }  else {
            alert('Dealer gana');
        }
    }, 10);

    

}


// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosUsuario = puntosUsuario + valorCarta( carta );
    console.log(puntosUsuario);
    smallPuntosUsuario.textContent = puntosUsuario + ' pts';
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`
    imgCarta.className = 'carta'; // imgCarta.classList.add('carta');
    divCartasUsuarioImgs.append(imgCarta);

    if ( puntosUsuario > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnParar.disabled = true;
        turnoComputadora(puntosUsuario);
    } else if ( puntosUsuario === 21 ) {
        console.warn('21, ganaste')
        btnPedir.disabled = true;
        btnParar.disabled = true;
        turnoComputadora(puntosUsuario);
    }

    

});

btnParar.addEventListener('click', () => {

    btnParar.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosUsuario);

});

btnNuevoGame.addEventListener('click', () => {
    baraja = [];
    baraja = crearBaraja();
    btnParar.disabled = false;
    btnPedir.disabled = false;
    puntosUsuario = 0;
    puntosComputador = 0;

    smallPuntosUsuario.textContent = 0 + ' pts'
    smallPuntosComputador.textContent = 0 + ' pts'
    divCartasUsuarioImgs.innerHTML = '';
    divCartasComputadorImgs.innerHTML = '';



});