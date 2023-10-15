const game = document.getElementById('game');
const buttons = document.querySelectorAll('input[type=radio]');
const tryAgain = document.getElementById('try-again');
const scoreElement = document.getElementById('score');

let difficulty = 'easy';
let isPlaying = true;
let different = null;
const gameDifficulty = {
  hard: {
    mod1: 8,
    mod2: 4,
    score: 0,
    highScore: localStorage.getItem('hardHighScore') || 0,
  },
  easy: {
    mod1: 12,
    mod2: 6,
    score: 0,
    highScore: localStorage.getItem('easyHighScore') || 0,
  },
};

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const response = window.confirm(
      'This is going to reset the game. Want to proceed?'
    );

    if (!response) e.preventDefault();
    difficulty = e.target.value;
    resetGame();
  });
});

createSquares();

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return { r, g, b };
}

function differentColor(color) {
  const randomNumber = () => {
    const { mod1, mod2 } = gameDifficulty[difficulty];
    const sign = Math.random() < 0.5 ? 1 : -1;

    return sign * Math.floor(Math.random() * mod1) + sign * mod2;
  };

  const differentColor = {
    r: color.r + randomNumber(),
    g: color.g + randomNumber(),
    b: color.b + randomNumber(),
  };

  return `rgb(${differentColor.r}, ${differentColor.g}, ${differentColor.b})`;
}

function createSquares() {
  game.innerHTML = '';
  const squares = [];

  const color = randomColor();

  for (let i = 0; i < 6; ++i) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

    square.onclick = wrongColor;

    game.appendChild(square);
    squares.push(square);
  }

  different = squares[Math.floor(Math.random() * squares.length)];

  different.onclick = rightColor;
  different.style.backgroundColor = differentColor(color);
}

function resetGame() {
  gameDifficulty[difficulty].score = 0;
  tryAgain.innerHTML = '';
  isPlaying = true;
  createSquares();
  scoreElement.innerHTML = 'Pick a block to play.';
}

function wrongColor() {
  if (!isPlaying) return;
  isPlaying = false;

  const { score, highScore } = gameDifficulty[difficulty];

  if (score > highScore) {
    gameDifficulty[difficulty].highScore = score;
    localStorage.setItem(`${difficulty}HighScore`, score);
  }

  const button = document.createElement('button');
  button.onclick = resetGame;
  button.innerHTML = 'Try again';
  scoreElement.innerHTML = `Game over <|3 <br /> Score: <b>${score}</b> <br /> Highest score: <b>${gameDifficulty[difficulty].highScore}</b>`;
  different.style.outline = `5px solid #d9d9d9`;
  button.classList.add('button');
  tryAgain.appendChild(button);
}

function rightColor() {
  if (!isPlaying) return;
  gameDifficulty[difficulty].score++;
  scoreElement.innerHTML = `Your score: <b>${gameDifficulty[difficulty].score}</b>`;
  createSquares();
}
