import './style.css'
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH, DIRECTIONS } from './constants.js'
import { buildBoard, buildNewRow, getRandomPiece, resetBoard } from './utils.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT
ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = buildBoard()

let piece = {
  ...getRandomPiece()
}

let timeCounter = 1

function update (time = 0) {
  if (timeCounter * 1000 < time) {
    timeCounter++
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      freezePiece()
    }
  }
  draw()

  window.requestAnimationFrame(update)
}

function draw () {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Board drawing
  board.forEach((row, y) => {
    row.forEach(({ v, c }, x) => {
      ctx.fillStyle = c
      if (v === 1) {
        ctx.fillRect(x, y, 1, 1)
      }
    })
  })

  // Piece drawing
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        ctx.fillStyle = piece.color
        ctx.fillRect(piece.position.x + x, piece.position.y + y, 1, 1)
      }
    })
  })
}

function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 &&
        board[y + piece.position.y]?.[x + piece.position.x]?.v !== 0
      )
    })
  })
}

function deleteRows () {
  board.forEach((row, y) => {
    if (row.every(({ v }) => v === 1)) {
      board.splice(y, 1)
      board.unshift(buildNewRow())
    }
  })

  piece = {
    ...getRandomPiece()
  }

  if (checkCollision()) {
    window.alert('Game over')
    resetBoard(board)
    piece = {
      ...getRandomPiece()
    }
  }
}

function freezePiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x].v = 1
        board[y + piece.position.y][x + piece.position.x].c = piece.color
      }
    })
  })

  deleteRows()
}

document.addEventListener('keydown', e => {
  if (e.key === DIRECTIONS.DOWN) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      freezePiece()
    }
  }
  if (e.key === DIRECTIONS.LEFT) {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }
  if (e.key === DIRECTIONS.RIGHT) {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }
  if (e.key === DIRECTIONS.UP) {
    const rotated = []

    for (let i = 0; i < piece.shape[0].length; i++) {
      const rows = []

      for (let j = piece.shape.length - 1; j >= 0; j--) {
        rows.push(piece.shape[j][i])
      }

      rotated.push(rows)
    }
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollision()) {
      piece.shape = previousShape
    }
  }
})

update()
