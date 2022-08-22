let board = document.querySelector(".board");
let digits = document.querySelector(".digits");
let numberSelected = null;
let tileSelected = null;

function createGame() {
  for (let i = 1; i < 10; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.classList.add("number");
    number.classList.add("unselectable");
    number.addEventListener("click", selectNumber);
    digits.appendChild(number);
  }

  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      let tile = document.createElement("div");
      tile.id = `${i}-${j}`;
      tile.classList.add("tile");
      tile.classList.add("unselectable");
      tile.addEventListener("click", selectTile);
      board.appendChild(tile);
      if (i == 3 || i == 6) {
        tile.classList.add("horizontal-line");
      }
      if (j == 3 || j == 6) {
        tile.classList.add("vertical-line");
      }
    }
  }
}

function selectNumber() {
  if (numberSelected) {
    numberSelected.classList.remove("selected");
  }
  if (this === numberSelected) {
    numberSelected = null;
    return;
  }
  numberSelected = this;
  numberSelected.classList.add("selected");
  console.log(numberSelected);
}

function selectTile() {
  if (numberSelected) {
    this.innerText = numberSelected.innerText;
  } else {
    this.innerText = "";
  }
}

createGame();
