import { KEY_SQUARES, FILES, RANKS, BOARD_SQUARES } from './constants.js';

// Function to return the index of the current square
export function fileRankBoard(file, rank) {
    return 21 + file + rank * 10;
}
  

// Function to create the chessboard
export function createBoard() {

    // Create an array with 120 elements, initialized to offBoard, current value: 100
    const boardArray = Array.from(
      { length: BOARD_SQUARES },
      () => KEY_SQUARES.offBoard
    );
  
    // Loop through the range and fill the central 8x8 square with board positions
    for (let r = startRank; r <= endRank; r++) {
      for (let f = startFile; f <= endFile; f++) {
        const sq = fileRankBoard(f, r);
        boardArray[sq] = { file: f, rank: r };
      }
    }
    return boardArray;
  };
  
// const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
// Function to convert Forsyth Edwards Notation (FEN) to a chessboard position
const fenToPosition = (fen) => {
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
        // if (piece) {
          // Convert file index to ASCII value (A-H) and rank index to chess rank (8-1)
          const square = String.fromCharCode(65 + fileIndex) + (8 - rankIndex);
          chessboard[square] = piece;
        // }
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
export function updateBoardPositions(fenPosition){


    // Function to create an HTML element for a chess piece
    const createPieceElement = (color, pieceType, square) => {
      // Create piece element with dynamic template strings
      const pieceElement = document.createElement('img');
      pieceElement.src = `assets/images/chess-${pieceType}-${color === 'white' ? 'regular' : 'solid' }.svg`
      pieceElement.alt = `${color} ${pieceType}`
      pieceElement.id = `${color}-${pieceType}-${square}`;
      pieceElement.className = 'chess-piece';
      return pieceElement;
    }
  
    // Function to update a specific square on the board with a piece
    const updateSquare = (squareId, piece) => {
      if (piece) {
        // Destructure type and color from pieceMap object
        const { type, color } = pieceMap[piece];
        // Clear any existing pieces from the current square
        squareId.innerHTML = '';
  
        const pieceElement = createPieceElement(color, type, squareId.id)
        // Append the piece to the current square
        squareId.appendChild(pieceElement)
      } else {
        squareId.innerHTML = '';
      }
    }
  
    // Loop through each square on the board and update it with the corresponding piece
    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
        const square = String.fromCharCode(65 + fileIndex) + (8 - rankIndex);
        const piece = fenPosition.position[square];
        // Grab the square element from HTML based on ID
        const squareId = document.getElementById(square);
  
        if (squareId) {
          updateSquare(squareId, piece)
        }
      }
    }
  }





  console.log(rows)






// Example usage

const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const position = fenToPosition(DEFAULT_POSITION);
console.log(position.position)
updateBoardPositions(position);

// Example usage
const chessBoard = createBoard();
// console.log(chessBoard)
console.log(chessBoard[22]);
console.log(chessBoard[KEY_SQUARES.e8]);
console.log(chessBoard[KEY_SQUARES.f1]);
const whitePieces = Player.createPieces("White");
const blackPieces = Player.createPieces("Black");
console.log(whitePieces)
console.log(blackPieces)
const whitePlayer = new Player("White", whitePieces);
const blackPlayer = new Player("Black", blackPieces);
console.log(whitePlayer);
console.log(blackPlayer);
const whitePawn = Piece.createPiece(BOARD_PIECES.wP);
console.log(whitePawn);