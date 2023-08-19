import { KEY_SQUARES, BOARD_SQUARES, START_RANK, END_RANK, START_FILE, END_FILE, PIECE_MAP } from './constants.js';
import Piece from './pieces.js';


export default class Board {
  constructor() {
    this.boardArray = this.createBoard()
  }

  // Function to create the chessboard
  createBoard() {
    // Create an array with 120 elements, initialized to offBoard, current value: 100
    let boardArray = Array.from(
      { length: BOARD_SQUARES },
      () => KEY_SQUARES.offBoard
    );

    // Loop through the range and fill the central 8x8 square with board positions
    for (let r = START_RANK; r <= END_RANK; r++) {
      for (let f = START_FILE; f <= END_FILE; f++) {
        const sq = this.fileRankBoard(f, r);
        boardArray[sq] = { file: f, rank: r };
      }
    }
    return boardArray;
  };

  // const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  // Function to convert Forsyth Edwards Notation (FEN) to a chessboard position
  fenToPosition(fen) {
    // Split the FEN string into individual components
    const [position, colorActive, castlingAvail, enPassant, halfMove, fullMoveNum] = fen.split(' ');

    // Convert the position part of the FEN string into rows
    const rows = position.split('/').map(row => {
      return row.split('').reduce((acc, char) => {
        // Check if the current character is a letter (chess piece)
        if (isNaN(char)) {
          acc.push(char);
        } else {
          // If the character is a number, fill with empty strings that number of times (empty squares)
          acc = acc.concat(Array(Number(char)).fill(''));
        }
        return acc;
      }, []);
    });

    const chessboard = {};
    // Place the pieces in the corresponding squares on the chessboard
    rows.forEach((row, rankIndex) => {
      row.forEach((piece, fileIndex) => {
        if (piece) {
          // Convert file index to ASCII value (A-H) and rank index to chess rank (8-1)
          const square = String.fromCharCode(65 + fileIndex) + (8 - rankIndex);
          chessboard[square] = piece;
        }
      });
    });

    // Return the chessboard position and other game state information
    return {
      position: chessboard,
      colorActive,
      castlingAvail,
      enPassant,
      halfMove,
      fullMoveNum
    };
  };

  // Function to update the board positions based on the FEN position
  updateBoardPositions(fenPosition) {
    // Loop through each square on the board and update it with the corresponding piece
    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
        const square = String.fromCharCode(65 + fileIndex) + (8 - rankIndex);
        const piece = fenPosition.position[square];
        // Grab the square element from HTML based on ID
        const squareId = document.getElementById(square);

        if (squareId) {
          this.updateSquare(squareId, piece)
        }
      }
    }
  }


  // Function to update a specific square on the board with a piece
  updateSquare(squareId, piece) {
    if (piece) {
      // Destructure type and color from pieceMap object
      const { type, color } = PIECE_MAP[piece];
      // Clear any existing pieces from the current square
      squareId.innerHTML = '';
      const newPiece = new Piece()
      const pieceElement = newPiece.createPieceElement(color, type, squareId.id)
      // Append the piece to the current square
      squareId.appendChild(pieceElement)
    } else {
      squareId.innerHTML = '';
    }
  }

  // Function to return the index of the current square
  fileRankBoard(file, rank) {
    return 21 + file + rank * 10;
  }
}

// Example usage



const board = new Board();
console.log(board);
console.log(board.boardArray);
console.log(board.boardArray[22]);
console.log(board.boardArray[KEY_SQUARES.e8]);
console.log(board.boardArray[KEY_SQUARES.f1]);
const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const position = board.fenToPosition(DEFAULT_POSITION);
console.log(position.position)
board.updateBoardPositions(position);
