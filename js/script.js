/*
**Consegna**
L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

**Bonus**
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

const container = document.querySelector('.container');
let sqPerRow;

document.getElementById('start').addEventListener('click', function(){
  sqPerRow = document.getElementById('level').value;
  console.log(sqPerRow);
  container.innerHTML = '';
  init (sqPerRow);
})

//init (sqPerRow);
function init (ElPerRow){
  const totalSquares = Math.pow(ElPerRow, 2);
  console.log(totalSquares);
  for(let i = 0; i < totalSquares; i++) {
    createSquares(i);
  }
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

function clickedSq() {
  console.log(this.customSq);
  //this.innerHTML = this.customSq;
  this.classList.add('aquamarine');

}