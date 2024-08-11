import { BOARD_WIDTH, BOARD_HEIGHT, PIECES } from './constants'

export function buildNewRow () {
  const row = Array(BOARD_WIDTH)

  for (let i = 0; i < row.length; i++) {
    row[i] = { v: 0, c: '#000' }
  }

  return row
}

export function buildBoard () {
  const board = Array(BOARD_HEIGHT)

  for (let i = 0; i < board.length; i++) {
    board[i] = buildNewRow()
  }

  return board
}

export function getRandomPiece () {
  const piece = PIECES[Math.floor(Math.random() * PIECES.length)]

  return {
    position: { x: 4, y: 0 },
    ...piece
  }
}

export function resetBoard (board) {
  for (let i = 0; i < board.length; i++) {
    board[i] = buildNewRow()
  }
}
