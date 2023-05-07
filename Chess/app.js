const boardSize = 8;
const boardWidth = 600;
const boardHeight = 600;
const tileSize = boardWidth / boardSize;

class Piece {
	constructor(x, y, color, type, board) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.type = type;
		this.piece = document.createElement("div");
		this.piece.classList.add("piece");
		this.piece.classList.add(this.color);
		this.piece.classList.add(this.type);
		this.piece.style.backgroundImage = `url("assets/${this.color}-${this.type}.png")`;
		this.piece.style.backgroundSize = "cover";
		this.piece.style.backgroundPosition = "center";
		this.highlighting = false;

		this.board = board.board;

		this.piece.addEventListener("click", () => {
			if (board.turn !== this.color) return;
			board.highlightMoves(this.getValidMoves(), this);
			this.highlighting = true;
		});
	}

	pieceThere(x, y) {
		return this.board[y][x].tile.currentPiece;
	}

	sameColorPiece(x, y) {
		return this.board[y][x].tile.currentPiece.color === this.color;
	}
}

class Pawn extends Piece {
	constructor(x, y, color, type, board) {
		super(x, y, color, type, board);
		this.firstMove = true;
	}

	getValidMoves() {
		let validMoves = [];

		if (this.firstMove) {
			if (this.color === "white") {
				validMoves.push([this.x, this.y + 2]);
			} else {
				validMoves.push([this.x, this.y - 2]);
			}
		}
		if (this.color === "white") {
			validMoves.push([this.x, this.y + 1]);
		} else {
			validMoves.push([this.x, this.y - 1]);
		}
		return validMoves;
	}
}

class Knight extends Piece {
	constructor(x, y, color, type, board) {
		super(x, y, color, type, board);
	}

	getValidMoves() {
		let validMoves = [];
		let moves = [
			[this.x + 2, this.y + 1], // 2 right 1 up
			[this.x + 2, this.y - 1], // 2 right 1 down
			[this.x - 2, this.y + 1], // 2 left 1 up
			[this.x - 2, this.y - 1], // 2 left 1 down
			[this.x + 1, this.y + 2], // 2 up 1 right
			[this.x + 1, this.y - 2], // 2 up 1 left
			[this.x - 1, this.y + 2], // 2 down 1 right
			[this.x - 1, this.y - 2], // 2 down 1 left
		];
		// Now filter if the move is inside the board
		moves.forEach((move) => {
			if (
				move[0] >= 0 &&
				move[0] < boardSize &&
				move[1] >= 0 &&
				move[1] < boardSize
			) {
				validMoves.push(move);
			}
		});
		// Filter out moves if there is a piece of the same color
		validMoves = validMoves.filter((move) => {
			if (board.board[move[1]][move[0]].tile.currentPiece) {
				return (
					board.board[move[1]][move[0]].tile.currentPiece.color !== this.color
				);
			}
			return true;
		});
		return validMoves;
	}
}

class Bishop extends Piece {
	constructor(x, y, color, type, board) {
		super(x, y, color, type, board);
	}

	getValidMoves() {
		let validMoves = [];

		// Up Right
		for (
			let i = this.x + 1, j = this.y - 1;
			i < boardSize && j >= 0;
			i++, j--
		) {
			if (this.pieceThere(i, j)) {
				if (this.sameColorPiece(i, j)) break;
				validMoves.push([i, j]);
				break;
			}
			validMoves.push([i, j]);
		}
		// Up Left
		for (let i = this.x - 1, j = this.y - 1; i >= 0 && j >= 0; i--, j--) {
			if (this.pieceThere(i, j)) {
				if (this.sameColorPiece(i, j)) break;
				validMoves.push([i, j]);
				break;
			}
			validMoves.push([i, j]);
		}
		// Down Right
		for (
			let i = this.x + 1, j = this.y + 1;
			i < boardSize && j < boardSize;
			i++, j++
		) {
			if (this.pieceThere(i, j)) {
				if (this.sameColorPiece(i, j)) break;
				validMoves.push([i, j]);
				break;
			}
			validMoves.push([i, j]);
		}
		// Down Left
		for (
			let i = this.x - 1, j = this.y + 1;
			i >= 0 && j < boardSize;
			i--, j++
		) {
			if (this.pieceThere(i, j)) {
				if (this.sameColorPiece(i, j)) break;
				validMoves.push([i, j]);
				break;
			}
			validMoves.push([i, j]);
		}

		return validMoves;
	}
}

class Rook extends Piece {
	constructor(x, y, color, type, board) {
		super(x, y, color, type, board);
	}

	getValidMoves() {
		let validMoves = [];

		// Up
		for (let i = this.y - 1; i >= 0; i--) {
			if (this.pieceThere(this.x, i)) {
				if (!this.sameColorPiece(this.x, i)) validMoves.push([this.x, i]);
				break;
			}
			validMoves.push([this.x, i]);
		}
		// Down
		for (let i = this.y + 1; i < boardSize; i++) {
			if (this.pieceThere(this.x, i)) {
				if (!this.sameColorPiece(this.x, i)) validMoves.push([this.x, i]);
				break;
			}
			validMoves.push([this.x, i]);
		}
		// Left
		for (let i = this.x - 1; i >= 0; i--) {
			if (this.pieceThere(i, this.y)) {
				if (!this.sameColorPiece(i, this.y)) validMoves.push([i, this.y]);
				break;
			}
			validMoves.push([i, this.y]);
		}
		// Right
		for (let i = this.x + 1; i < boardSize; i++) {
			if (this.pieceThere(i, this.y)) {
				if (!this.sameColorPiece(i, this.y)) validMoves.push([i, this.y]);
				break;
			}
			validMoves.push([i, this.y]);
		}

		return validMoves;
	}
}

class Queen extends Piece {
	constructor(x, y, color, type, board) {
		super(x, y, color, type, board);
	}

	getValidMoves() {
		let validMoves = Rook.prototype.getValidMoves.call(this);
		validMoves = validMoves.concat(Bishop.prototype.getValidMoves.call(this));
		return validMoves;
	}
}

class King extends Piece {
	constructor(x, y, color, type, board) {
		super(x, y, color, type, board);
	}

	getValidMoves() {
		let validMoves = [];
		let moves = [
			[this.x + 1, this.y + 1], // Up Right
			[this.x + 1, this.y - 1], // Up Left
			[this.x - 1, this.y + 1], // Down Right
			[this.x - 1, this.y - 1], // Down Left
			[this.x + 1, this.y], // Up
			[this.x - 1, this.y], // Down
			[this.x, this.y + 1], // Right
			[this.x, this.y - 1], // Left
		];

		// Now filter if the move is inside the board
		moves.forEach((move) => {
			if (
				move[0] >= 0 &&
				move[0] < boardSize &&
				move[1] >= 0 &&
				move[1] < boardSize
			) {
				validMoves.push(move);
			}
		});

		// Filter out moves if there is a piece of the same color
		validMoves = validMoves.filter((move) => {
			if (board.board[move[1]][move[0]].tile.currentPiece) {
				return (
					board.board[move[1]][move[0]].tile.currentPiece.color !== this.color
				);
			}
			return true;
		});
		return validMoves;
	}
}

class Tile {
	constructor(x, y, board) {
		this.x = x;
		this.y = y;
		this.tile = document.createElement("div");
		this.tile.classList.add("tile");
		this.tile.classList.add(x % 2 === y % 2 ? "white" : "black");

		this.tile.currentPiece = null;
		this.tile.board = board;
	}
}

class Board {
	constructor() {
		this.board = [];
		this.whitePieces = [];
		this.blackPieces = [];
		this.boardSize = boardSize;
		this.boardWidth = boardWidth;
		this.boardHeight = boardHeight;
		this.rotate = true;
		this.tileSize = tileSize;
		this.turn = "white";
		this.root = document.getElementById("root");
		this.root.classList.toggle("rotate");

		this.highlighting = false;
		this.lastPieceHighlighted = null;

		this.moveListener = this.moveListener.bind(this);

		this.createBoard();
	}

	createBoard() {
		if (!this.root) return;

		this.root.classList.add("board");

		this.root.style.width = this.boardWidth + "px";
		this.root.style.height = this.boardHeight + "px";

		for (let i = 0; i < this.boardSize; i++) {
			this.board[i] = [];
			for (let j = 0; j < this.boardSize; j++) {
				this.board[i][j] = new Tile(i, j, this);
				this.root.appendChild(this.board[i][j].tile);
			}
		}
		this.createPieces();
	}

	createPieces() {
		// Pawns
		for (let i = 0; i < this.boardSize; i++) {
			this.whitePieces.push(new Pawn(i, 1, "white", "pawn", this));
			this.blackPieces.push(new Pawn(i, 6, "black", "pawn", this));
		}

		// Rooks
		this.whitePieces.push(new Rook(0, 0, "white", "rook", this));
		this.whitePieces.push(new Rook(7, 0, "white", "rook", this));
		this.blackPieces.push(new Rook(0, 7, "black", "rook", this));
		this.blackPieces.push(new Rook(7, 7, "black", "rook", this));

		// Knights
		this.whitePieces.push(new Knight(1, 0, "white", "knight", this));
		this.whitePieces.push(new Knight(6, 0, "white", "knight", this));
		this.blackPieces.push(new Knight(1, 7, "black", "knight", this));
		this.blackPieces.push(new Knight(6, 7, "black", "knight", this));

		// Bishops
		this.whitePieces.push(new Bishop(2, 0, "white", "bishop", this));
		this.whitePieces.push(new Bishop(5, 0, "white", "bishop", this));
		this.blackPieces.push(new Bishop(2, 7, "black", "bishop", this));
		this.blackPieces.push(new Bishop(5, 7, "black", "bishop", this));

		// Queens
		this.whitePieces.push(new Queen(4, 0, "white", "queen", this));
		this.blackPieces.push(new Queen(4, 7, "black", "queen", this));

		// Kings
		this.whitePieces.push(new King(3, 0, "white", "king", this));
		this.blackPieces.push(new King(3, 7, "black", "king", this));

		this.whitePieces.push(new Queen(1, 2, "white", "queen", this));

		this.updateBoard();
	}

	updateBoard() {
		// Set all tiles to null, then set tiles with pieces to the cuurent piece
		this.board.forEach((row) => {
			row.forEach((tile) => {
				tile.tile.innerHTML = "";
			});
		});

		this.whitePieces.forEach((piece) => {
			this.board[piece.y][piece.x].tile.currentPiece = piece;
		});
		this.blackPieces.forEach((piece) => {
			this.board[piece.y][piece.x].tile.currentPiece = piece;
		});

		this.renderPieces();
	}

	renderPieces() {
		this.whitePieces.forEach((piece) => {
			this.board[piece.y][piece.x].tile.appendChild(piece.piece);
			if (this.rotate) piece.piece.style.transform = "rotate(180deg)";
			else piece.piece.style.transform = "rotate(0deg)";
		});
		this.blackPieces.forEach((piece) => {
			this.board[piece.y][piece.x].tile.appendChild(piece.piece);
			if (this.rotate) piece.piece.style.transform = "rotate(180deg)";
			else piece.piece.style.transform = "rotate(0deg)";
		});
	}

	rotateBoard() {
		this.root.classList.toggle("rotate");
		this.rotate = !this.rotate;
		this.updateBoard();
	}

	// Weird behavior when clicking
	moveListener(e) {
		console.log(e.target.board);
		e.target.board.move(e.target.x, e.target.y);
	}

	clearHighlights() {
		this.board.forEach((row) => {
			row.forEach((tile) => {
				tile.tile.classList.remove("highlight");
				tile.tile.removeEventListener("click", this.moveListener);
			});
		});
	}

	highlightMoves(moves, piece) {
		if (this.highlighting) {
			this.clearHighlights();
			if (this.lastPieceHighlighted === piece) {
				this.highlighting = false;
				this.lastPieceHighlighted = null;
				return;
			}
		}

		moves.forEach((move) => {
			this.board[move[1]][move[0]].tile.classList.add("highlight");

			this.board[move[1]][move[0]].tile.addEventListener(
				"click",
				this.moveListener
			);
		});
		this.lastPieceHighlighted = piece;
		this.highlighting = true;
	}

	move(x, y) {
		let piece = this.lastPieceHighlighted;
		this.board[piece.y][piece.x].tile.currentPiece = null;
		this.board[y][x].tile.currentPiece = piece;
		piece.x = x;
		piece.y = y;
		this.updateBoard();
		this.clearHighlights();
		this.highlighting = false;
		this.lastPieceHighlighted = null;
		this.turn = this.turn === "white" ? "black" : "white";
	}
}

let board = new Board();
