const  miModulo = ( () => {


    'use strict'

    /**
     * 2C = Two of Clubs (dos de tréboles)
     * 2D = Two of Diamonds (dos de diamantes)
     * 2H = Two of Hearts (dos de corazones)
     * 2S = Two of Spades (dos de picas)
    */

    let baraja          = [];
    const letras        = ['C', 'D', 'H', 'S'],
          especiales    = ['A', 'J', 'K', 'Q'];

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnParar = document.querySelector('#btnParar'), 
          btnNuevoGame = document.querySelector('#btnNuevo');
    //let puntosUsuario = 0,
    //    puntosComputador = 0;
    let puntosJugadores = [];
    const puntosHTML = document.querySelectorAll('small')
    const divCartasJugadores = document.querySelectorAll('.divCartas')


    // Función para la creación de una nueva baraja
    const crearBaraja = () => {
        baraja = [];
        for(let i = 2; i <= 10; i++ ) {
            for( let letra of letras ) {
                baraja.push(i + letra);
            }
        }

        for ( let especial of especiales) {
            for ( let letra of letras ) {
                baraja.push(especial + letra);
            }
        }

        return _.shuffle(baraja); // barajear
    }

    // Esta función inica el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        baraja = crearBaraja();
        puntosJugadores = [];
        for ( let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnParar.disabled = false;
    }

    // Esta función permite tomar una carta
    const pedirCarta = () => {

        if ( baraja.length === 0) {
            throw 'No hay cartas en la baraja.'
        }

        let numDeCartas = []; 
        for ( let i = 0;  i <= baraja.length - 1; i++) {
            numDeCartas.push(i);
        }

        numDeCartas = _.shuffle(numDeCartas);

        let carta = baraja[numDeCartas[0]];
        
        baraja.splice(numDeCartas[0], 1);
        // const carta = baraja.pop();

        return carta; 
    }

    // pedirCarta();

    // Función para saber qué valor tiene una carta

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); // Remover la última letra y solo tomar el resto, o sea tomar el primer valor de la carta.

        return (!isNaN(valor)) ? valor * 1 : (valor === 'A') ? 11 : 10; // Retorna los puntos dependiendo de si es un valor númerico o una letra.
    }

    // Acumular los puntos del jugador respectivo 
    // Turno: 0 = primer jugador y el último será el dealer (computadora)
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputador ] = puntosJugadores;

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

    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputador = 0; 
        do {
            const carta = pedirCarta();
            puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1);
            //puntosComputador = puntosComputador + valorCarta( carta );
            //puntosHTML[1].innerText = puntosComputador;
            // smallPuntosComputador.textContent = puntosComputador + ' pts';
            

            if ( puntosMinimos > 21 ) {
                break;
            }


        } while ( ( puntosComputador < puntosMinimos ) && ( puntosMinimos <= 21 ) );

        determinarGanador();
    }

    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosUsuario = acumularPuntos(carta, 0);
        // puntosUsuario = puntosUsuario + valorCarta( carta );
        // puntosHTML[0].innerText = puntosUsuario; 
        // smallPuntosUsuario.textContent = puntosUsuario + ' pts';
        crearCarta(carta, 0);

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
        turnoComputadora(puntosJugadores[0]);

    });

    btnNuevoGame.addEventListener('click', () => {
        inicializarJuego();

    });

    return {

        nuevoJuego: inicializarJuego

    };


})();