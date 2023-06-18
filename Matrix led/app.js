const rows = 7;
const cols = 8;
const cellSize = 50;
const delayTime = 1000;

const letters = [
	{
		letter: "A",
		matrix: [
			[0, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 1, 1, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
		],
	},
	{
		letter: "B",
		matrix: [
			[1, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 1, 1, 0],
		],
	},
	{
		letter: "C",
		matrix: [
			[0, 1, 1, 1],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[0, 1, 1, 1],
		],
	},
	{
		letter: "D",
		matrix: [
			[1, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 1, 1, 0],
		],
	},
	{
		letter: "E",
		matrix: [
			[1, 1, 1, 1],
			[1, 0, 0, 0],
			[1, 1, 1, 0],
			[1, 0, 0, 0],
			[1, 1, 1, 1],
		],
	},
	{
		letter: "F",
		matrix: [
			[1, 1, 1, 1],
			[1, 0, 0, 0],
			[1, 1, 1, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
		],
	},
	{
		letter: "G",
		matrix: [
			[0, 1, 1, 1],
			[1, 0, 0, 0],
			[1, 0, 1, 1],
			[1, 0, 0, 1],
			[0, 1, 1, 1],
		],
	},
	{
		letter: "H",
		matrix: [
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 1, 1, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
		],
	},
	{
		letter: "I",
		matrix: [
			[1, 1, 1],
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 1],
		],
	},
	{
		letter: "J",
		matrix: [
			[0, 0, 1],
			[0, 0, 1],
			[0, 0, 1],
			[1, 0, 1],
			[0, 1, 0],
		],
	},
	{
		letter: "K",
		matrix: [
			[1, 0, 0, 1],
			[1, 0, 1, 0],
			[1, 1, 0, 0],
			[1, 0, 1, 0],
			[1, 0, 0, 1],
		],
	},
	{
		letter: "L",
		matrix: [
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 1, 1, 1],
		],
	},
	{
		letter: "M",
		matrix: [
			[1, 0, 0, 0, 1],
			[1, 1, 0, 1, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
		],
	},
	{
		letter: "N",
		matrix: [
			[1, 0, 0, 0, 1],
			[1, 1, 0, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 0, 1, 1],
			[1, 0, 0, 0, 1],
		],
	},
	{
		letter: "O",
		matrix: [
			[0, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[0, 1, 1, 0],
		],
	},
	{
		letter: "P",
		matrix: [
			[1, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 1, 1, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
		],
	},
	{
		letter: "Q",
		matrix: [
			[0, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 0, 1, 1],
			[1, 0, 0, 1],
			[0, 1, 1, 1],
		],
	},
	{
		letter: "R",
		matrix: [
			[1, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 1, 1, 0],
			[1, 0, 1, 0],
			[1, 0, 0, 1],
		],
	},
	{
		letter: "S",
		matrix: [
			[0, 1, 1, 1],
			[1, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 1],
			[1, 1, 1, 0],
		],
	},
	{
		letter: "T",
		matrix: [
			[1, 1, 1],
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 0],
		],
	},
	{
		letter: "U",
		matrix: [
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[0, 1, 1, 0],
		],
	},
	{
		letter: "V",
		matrix: [
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0],
			[0, 0, 1, 0, 0],
		],
	},
	{
		letter: "W",
		matrix: [
			[1, 0, 0, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 1, 0, 1, 1],
			[1, 0, 0, 0, 1],
		],
	},
	{
		letter: "X",
		matrix: [
			[1, 0, 0, 0, 1],
			[0, 1, 0, 1, 0],
			[0, 0, 1, 0, 0],
			[0, 1, 0, 1, 0],
			[1, 0, 0, 0, 1],
		],
	},
	{
		letter: "Y",
		matrix: [
			[1, 0, 0, 0, 1],
			[0, 1, 0, 1, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0],
			[0, 1, 0, 0, 0],
		],
	},
	{
		letter: "Z",
		matrix: [
			[1, 1, 1, 1],
			[0, 0, 0, 1],
			[0, 0, 1, 0],
			[0, 1, 0, 0],
			[1, 1, 1, 1],
		],
	},
	{
		letter: " ",
		matrix: [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
	},
];

class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.grid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
		this.nextGrid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
		this.render();
	}

	render() {
		const matrix = document.getElementById("matrix");

		matrix.style.display = "grid";
		matrix.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
		matrix.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
		matrix.style.gap = "5px";

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				const cell = document.createElement("div");
				cell.classList.add("cell");
				cell.style.width = `${cellSize}px`;
				cell.style.height = `${cellSize}px`;
				cell.style.backgroundColor = this.grid[i][j] ? "black" : "white";
				this.grid[i][j] = cell;
				matrix.appendChild(cell);
			}
		}
	}

	clearGrid() {
		this.grid.forEach((row, i) => {
			row.forEach((col, j) => {
				this.grid[i][j].style.backgroundColor = "white";
			});
		});
	}

	updateMatrix() {
		this.clearGrid();
		this.nextGrid.forEach((row, i) => {
			row.forEach((col, j) => {
				this.grid[i][j].style.backgroundColor = col ? "red" : "white";
			});
		});
	}

	renderText(text) {
		const textArray = text.toUpperCase().split("");
		const textMatrix = textArray.map((letter) => {
			const letterObject = letters.find((l) => l.letter === letter);
			return letterObject.matrix;
		});

		for (let i = 0; i < textMatrix.length; i++) {
			setTimeout(() => {
				this.renderLetter(textMatrix[i]);
			}, delayTime * i);
		}
	}

	renderLetter(letter) {
		const letterMatrix = letter;
		const letterRows = letterMatrix.length;
		const letterCols = letterMatrix[0].length;

		const startRow = Math.floor((this.rows - letterRows) / 2);
		const startCol = Math.floor((this.cols - letterCols) / 2);

		for (let i = 0; i < letterRows; i++) {
			for (let j = 0; j < letterCols; j++) {
				this.nextGrid[startRow + i][startCol + j] = letterMatrix[i][j];
			}
		}
		this.updateMatrix();
		this.nextGrid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
	}
}

const caesarShift = (str, amount) => {
	if (amount < 0) {
		return caesarShift(str, amount + 26);
	}

	var output = "";

	for (var i = 0; i < str.length; i++) {
		var c = str[i];

		if (c.match(/[a-z]/i)) {
			var code = str.charCodeAt(i);

			if (code >= 65 && code <= 90) {
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
			} else if (code >= 97 && code <= 122) {
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
			}
		}

		output += c;
	}

	return output;
};

const matrix = new Matrix(rows, cols);

const urlParams = new URLSearchParams(window.location.search);
let text = urlParams.get("text");

if (text) {
	text = text.toUpperCase();
	text = caesarShift(text, 3);
}

console.log(text);

matrix.renderText(text ? text : "Hello World");
