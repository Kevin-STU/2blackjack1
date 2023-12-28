/**
 * 2C = Two of Clubs (dos de tréboles)
 * 2D = Two of Diamonds (dos de diamantes)
 * 2H = Two of Hearts (dos de corazones)
 * 2S = Two of Spades (dos de picas)
 */

let baraja          = [];
const letras        = ['C', 'D', 'H', 'S'];
const especiales    = ['A', 'J', 'K', 'Q'];


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
    console.log(baraja);
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

pedirCarta();

// Función para saber qué valor tiene una carta

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Remover la última letra y solo tomar el resto, o sea tomar el primer valor de la carta.

    return (!isNaN(valor)) ? valor * 1 : (valor === 'A') ? 11 : 10; // Retorna los puntos dependiendo de si es un valor númerico o una letra.
}
const valor = valorCarta( pedirCarta() );
console.log(valor);

