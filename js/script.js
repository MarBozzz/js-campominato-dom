/*
**Consegna**
****L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.**BONUS:**
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/


//generare bombe

//al click square
//se clicko bomba Game over
//contatore di tentativi
//con tentativi finiti Game over

//Game over funzione
//stampare risultato
//freeze del container tramite overlay

//reset funzione
//genero nuove bombe

const container = document.querySelector('.container');
let sqPerRow;
const BOMB_NUMBER = 16;
let bombs = [];
let score = 0;
let closureMessage;

document.getElementById('start').addEventListener('click', function(){
  sqPerRow = document.getElementById('level').value;
  console.log(sqPerRow);
  container.innerHTML = '';
  document.querySelector('.end-message').innerHTML = '';
  score = 0;
  init (sqPerRow);
})

//init (sqPerRow);
function init (ElPerRow){
  const totalSquares = Math.pow(ElPerRow, 2);
  console.log(totalSquares);
  for(let i = 0; i < totalSquares; i++) {
    createSquares(i);
  }
  bombs = addBombs(totalSquares);
  console.log('bombs', bombs);
}

function createSquares (idSquare){
  let square = document.createElement('div');
  square.className = 'square';
  square.classList.add('d-flex','justify-center', 'align-center');
  square.style.height = `calc(100% / ${sqPerRow}`;
  square.style.width = `calc(100% / ${sqPerRow}`;
  //square.innerHTML = idSquare + 1;
  square.customSq = idSquare + 1;
  square.addEventListener('click', clickedSq)
  container.append(square);
}

function addBombs (totalSquares){
  //array di bombs da riempire fino al raggiungimento di 16
  const addedBombs = [];
  //con ciclo while genero le bombs
  while (addedBombs.length < BOMB_NUMBER) {
    //faccio estrarre un numero da 1 al numero totale di squares  
    const bomb = getRandomNumber(1, totalSquares);
    //se l'estratto non è presente nell'array si pusha dentro
    if(!addedBombs.includes(bomb)){
    addedBombs.push(bomb);
    }
  }
  return addedBombs;

}
//funzione per generare num random
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clickedSq() {
  console.log(this.customSq);
  //this.innerHTML = this.customSq;
  this.classList.add('aquamarine');
  //se invece prendo una bomba, cioè l'ID della customDq è nell'array bombs
  if(!bombs.includes(this.customSq)){
    //aggiungo la classe clicked a this
    this.classList.add('clicked');
    //aggiungo al contatore i tentativi
    score++;
    console.log(score,'punteggio cumulato');
    //se il punteggio è uguale al numero di squares - il numero di bombs si vince, sennò si perde
    if(score === Math.pow(sqPerRow, 2) - BOMB_NUMBER){
      gameOver (true);
    }
  } else{
    gameOver (false);
  } 
}

function gameOver(isWin){
  //messaggio in footer di chiusura e riepilogo
  if(isWin){
    closureMessage = `HAI VINTO'ottenendo ${score} punti su ${Math.pow(sqPerRow, 2) - BOMB_NUMBER}`;
    console.log('HAI VINTO, ');
  } else {
    closureMessage = `HAI PERSO, ed ottenuto ${score} punti su ${Math.pow(sqPerRow, 2) - BOMB_NUMBER}`;
    console.log('GAME OVER');
  }
  document.querySelector('.end-message').innerHTML = closureMessage;
  showbombs ();
  //creo overlayer che al game-over non permette di toccare la griglia
  const overlayer = document.createElement('div');
  overlayer.className = 'game-overlayer';
  document.querySelector('.container').append(overlayer);
}

function showbombs() {
    const square = document.getElementsByClassName('square');
    for(let i = 0; i < square.length; i++){
        const checkBomb = square[i];
        console.log(checkBomb,'checkbomb');
        if(bombs.includes(checkBomb.customSq)){
          square[i].classList.add('bomb');
        }
    }
}