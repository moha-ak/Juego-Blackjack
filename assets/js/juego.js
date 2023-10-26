//El Patrón módulo

(()=>{

let baraja                  =[];
const tipos                 =['C','D','H','S'];
const barajasEspeciales     =['A','J','Q','K'];

let puntosJugador   = 0,
    puntosOrdenador = 0;

// html

const btnNuevo      = document.querySelector('#btnNuevo');
const btnPedir      = document.querySelector('#btnPedir'); 
const btnDetener    = document.querySelector('#btnDetener');
const puntosHTML    = document.querySelectorAll('small');
const imgCartasJ    = document.querySelector('#jugador-cartas')
const imgCartasO    = document.querySelector('#ordenador-cartas')

// rellenar Array de baraja

const crearBaraja = () => {

    for( let i = 2 ; i <=10; i++){
        for( let tipo of tipos){
            baraja.push(i+tipo);
        }

    }
    for(  let tipo of tipos){
        for(let barajaE of barajasEspeciales){
            baraja.push(barajaE+tipo);
        }

    }
    // console.log(baraja);
    // shuffle: Devuelve una copia aleatoria de la lista
    baraja = _.shuffle(baraja)
    return baraja;
    // console.log(baraja);

}


// console.log(baraja);

crearBaraja();

const pedirCarta=()=>{
    if ( baraja.length === 0 ) {
        throw 'No hay cartas en la baraja';
    }
    const carta = baraja.pop();
    return carta;
}


const valorCarta = (carta)=>{
    // cogemos el primer valor de carta 
    const valor = carta.substring(0, carta.length - 1);
    let puntos  = 0;

    // si es un numero lo multiplicamos por 1 para rentarlo como version number
    return  isNaN(valor) ?  
            (valor ==='A')? 11:10 
            :valor *1;

}

// turno de ordenador 
const turnoOrdenador =(puntosMinimos)=>{

    do{
        const carta = pedirCarta();
        
        puntosOrdenador = puntosOrdenador + valorCarta(carta);
        // console.log(puntosJugador);
        puntosHTML[1].innerText = puntosOrdenador;
        
        const imgCarta = document.createElement('img');
        imgCarta.src =`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        imgCartasO.append(imgCarta);
        if(puntosMinimos >21){
            break;
        }

    }while((puntosOrdenador < puntosMinimos) && puntosMinimos <=21);

    setTimeout(() => {
        
        if (puntosOrdenador=== puntosMinimos) {
            alert('empate')
            
        }else if (puntosMinimos>21) {
            alert('Ordenador Gana')
            
        }else if (puntosOrdenador >21) {
            alert('Jugador Gana')
            
        }else {
            alert('Ordenador Gana')
            
        }
        
    }, 100);
    
}



btnPedir.addEventListener('click', ()=>{

        const carta = pedirCarta();
        
        puntosJugador = puntosJugador + valorCarta(carta);
        // console.log(puntosJugador);
        puntosHTML[0].innerText = puntosJugador;
        
        const imgCarta = document.createElement('img');
        imgCarta.src =`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        imgCartasJ.append(imgCarta);
        
        if (puntosJugador > 21 ){
            console.warn('juego terminado, perdiste')
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);
        }else if(puntosJugador === 21 ){
            console.warn('21 , Genial')
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);
            
        }



})

btnDetener.addEventListener('click', ()=>{

    btnPedir.disabled= true;
    btnDetener.disabled= true;
    turnoOrdenador(puntosJugador);

})

btnNuevo.addEventListener('click', ()=>{
    baraja=[]
    baraja=crearBaraja();
    puntosJugador=0;
    puntosOrdenador=0;
    puntosHTML[0].innerText=0;
    puntosHTML[1].innerText=0;
    imgCartasJ.innerHTML='';
    imgCartasO.innerHTML='';
    btnPedir.disabled= false;
    btnDetener.disabled= false;
})


})();

