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