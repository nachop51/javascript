//jshint esversion:6
const _new = document.querySelector("#new");
const easy = document.querySelector("#easy");
const hard = document.querySelector("#hard");
const buttons = document.querySelectorAll(".block");
const title = document.querySelector("#color");
let gameStatus = false;

function randomColor() {
  let colors = [];
  for (let i = 0; i < 3; i++) {
    colors.push(Math.floor(Math.random() * 256));
  }
  return colors;
}

function generateColor(button, colors) {
  if (colors) {
    button.setAttribute(
      "style",
      `background-color: rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`
    );
    return;
  }
  colors = randomColor();
  button.setAttribute(
    "style",
    `background-color: rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`
  );
}

function nextGuess() {
  randomPos = Math.floor(Math.random() * 6);
  guess = randomColor();
  title.innerText = `rgb(${guess[0]}, ${guess[1]}, ${guess[2]})`;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains("guess"))
      buttons[i].classList.remove("guess");
    if (i === randomPos) generateColor(buttons[i], guess);
    else generateColor(buttons[i], null);
  }
  buttons[randomPos].classList.add("guess");
}

_new.addEventListener("click", function (e) {
  addListeners(buttons);
  if (!gameStatus) {
    nextGuess();
    gameStatus = true;
  }
});

function addListeners() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("guess")) {
        title.innerText = "That's right!";
        animate("correct");
      } else {
        title.innerText = "That's a nope";
        animate("wrong");
      }
      gameStatus = false;
    });
  });
}

function animate(mode) {
  if (gameStatus) {
    document.querySelector(".container").classList.add(mode);
    setTimeout(function () {
      document.querySelector(".container").classList.remove(mode);
    }, 500);
  }
}
