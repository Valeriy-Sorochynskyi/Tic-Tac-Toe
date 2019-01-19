"use strict";

let cells = document.querySelectorAll(".cell");
let restart = document.querySelector("#restart");
let toggle = true;
let count = 0;
let showMessage = document.querySelector(".endgame");
restart.addEventListener("click", restartGame);

for (let item of cells) {
  item.addEventListener("click", takeStep);
}

function takeStep(event) {
  let square = event.target;
  if (!square) return;
  if (square.innerText === "") {
    fillSquare(square, toggle);
    toggle = !toggle;
  }
  count++;
  checkWin(cells, count);
}

function fillSquare(square, toggle) {
  if (toggle) {
    square.innerText = "X";
  } else {
    square.innerText = "O";
  }
}

function restartGame() {
  for (let item of cells) {
    item.innerText = "";
    item.addEventListener("click", takeStep);
  }
  let showMessage = document.querySelector(".endgame");
  showMessage.style.display = "none";
  count = 0;
  toggle = true;
}

function checkWin(cells) {
  let winComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winComb.length; i++) {
    let wc = winComb[i];
    if (
      cells[wc[0]].innerText === cells[wc[1]].innerText &&
      cells[wc[1]].innerText === cells[wc[2]].innerText &&
      cells[wc[0]].innerText !== ""
    ) {
      showEndGame(showMessage, toggle);
      stopGame(cells);
    }
  }
  if (count === 9) {
    showEndGame(showMessage, toggle, count);
  }
}

function stopGame(cells) {
  for (let item of cells) {
    item.removeEventListener("click", takeStep);
  }
}

function showEndGame(showMessage, toggle, count) {
  let text = "";
  showMessage.style.display = "block";
  if (count === 9) {
    text = `it's draw!`;
  } else if (toggle === false) {
    text += "won X";
  } else text += "won O";
  showMessage.firstChild.textContent = text;
}
