// const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

// Here we define the chess peices and assign a corresponding integer
// b - black | w - white
// P - pawn | N - knight | B - bishop | R - rook | Q - queen | K - king
const BOARD_PIECES = {
  empty: 0,
  wP: 1,
  wN: 2,
  wB: 3,
  wR: 4,
  wQ: 5,
  wK: 6,
  bP: 7,
  bN: 8,
  bB: 9,
  bR: 10,
  bQ: 11,
  bK: 12,
};

// Colors for the board
const COLORS = { white: 0, black: 1, both: 2 };

// I assigned the board with 120 squares for a safety net to prevent off-board moves
const BOARD_SQUARES = 120;

// 0   1   2   3   4   5   6   7   8   9
// 10  11__12__13__14__15__16__17__18  19
// 20 |a1  b1  c1  d1  e1  f1  g1  h1| 29
// 30 |a2  b2  c2  d2  e2  f2  g2  h2| 39
// 40 |a3  b3  c3  d3  e3  f3  g3  h3| 49
// 50 |a4  b4  c4  d4  e4  f4  g4  h4| 59
// 60 |a5  b5  c5  d5  e5  f5  g5  h5| 69
// 70 |a6  b6  c6  d6  e6  f6  g6  h6| 79
// 80 |a7  b7  c7  d7  e7  f7  g7  h7| 89
// 90 |a8__b8__c8__d8__e8__f8__g8__h8| 99
// 100 101 102 103 104 105 106 107 108 109
// 110 111 112 113 114 115 116 117 118 119

// Key squares define the start and end of the board within the boardSquares array
const KEY_SQUARES = {
  a1: 21,
  b1: 22,
  c1: 23,
  d1: 24,
  e1: 25,
  f1: 26,
  g1: 27,
  h1: 28,
  a8: 91,
  b8: 92,
  c8: 93,
  d8: 94,
  e8: 95,
  f8: 96,
  g8: 97,
  h8: 98,
  offBoard: 100,
};

// Files for horizontal (x) axis
const FILES = {
  fileA: 0,
  fileB: 1,
  fileC: 2,
  fileD: 3,
  fileE: 4,
  fileF: 5,
  fileG: 6,
  fileH: 7,
  fileNone: 8,
};

// Ranks for vertical (y) axis
const RANKS = {
  rank1: 0,
  rank2: 1,
  rank3: 2,
  rank4: 3,
  rank5: 4,
  rank6: 5,
  rank7: 6,
  rank8: 7,
  rankNone: 8,
};

// Function to return the index of the current square
function fileRankBoard(file, rank) {
  return 21 + file + rank * 10;
}

const createBoard = () => {
  // Create an array with 120 elements, initialized to offBoard
  const boardArray = Array.from(
    { length: BOARD_SQUARES },
    () => KEY_SQUARES.offBoard
  );

  // Define the range for the central 8x8 square
  const startRank = RANKS.rank8;
  const endRank = RANKS.rank1;
  const startFile = FILES.fileA;
  const endFile = FILES.fileH;

  // Loop through the range and fill the central 8x8 square with board positions
  for (let r = startRank; r >= endRank; r--) {
    for (let f = startFile; f <= endFile; f++) {
      const sq = fileRankBoard(f, r);
      boardArray[sq] = { file: f, rank: r };
    }
  }
  return boardArray;
};

const chessBoard = createBoard();

console.log(chessBoard[99]);
console.log(chessBoard[KEY_SQUARES.e8]);
console.log(chessBoard[KEY_SQUARES.f1]);

// const chessBoard = [
//   ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
//   ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
//   ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
//   ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
//   ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
//   ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
//   ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
//   ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
// ];

class Piece {
  constructor(type, color) {
    this.type = type;
    this.color = color;
  }

  // Create board pieces using the BOARD_PIECES object properties
  static createPiece(pieceType) {
    let type, color;

    switch (pieceType) {
      case BOARD_PIECES.wP:
        type = "Pawn";
        color = "White";
        break;
      case BOARD_PIECES.wN:
        type = "Knight";
        color = "White";
        break;
      case BOARD_PIECES.wB:
        type = "Bishop";
        color = "White";
        break;
      case BOARD_PIECES.wR:
        type = "Rook";
        color = "White";
        break;
      case BOARD_PIECES.wQ:
        type = "Queen";
        color = "White";
        break;
      case BOARD_PIECES.wK:
        type = "King";
        color = "White";
        break;
      case BOARD_PIECES.bP:
        type = "Pawn";
        color = "Black";
        break;
      case BOARD_PIECES.bN:
        type = "Knight";
        color = "Black";
        break;
      case BOARD_PIECES.bB:
        type = "Bishop";
        color = "Black";
        break;
      case BOARD_PIECES.bR:
        type = "Rook";
        color = "Black";
        break;
      case BOARD_PIECES.bQ:
        type = "Queen";
        color = "Black";
        break;
      case BOARD_PIECES.bK:
        type = "King";
        color = "Black";
        break;
      default:
        color = "None";
        type = "Empty";
    }
    return new Piece(type, color);
  }
}

const whitePawn = Piece.createPiece(BOARD_PIECES.wP);
console.log(whitePawn)

// Player constructor to create players(b&w)
class Player {
  constructor(color, pieces) {
    this.color = color;
    this.pieces = pieces;
  }
  getPieces() {
    return this.pieces;
  }

  isMoveValid(piece, target) {
    // logic to validate if move is possible
  }

  movePiece(piece, target) {
    if (this.isMoveValid) {
      // logic to move piece after move have been validated.
    }
  }

  removePiece(pieceToRemove) {
    // code for taking piece off the board when taken
  }
  movePawn() {
    // code for moving pawns
  }
  moveRook() {
    //code for moving rooks
  }
  moveKnight() {
    //code for moving knights
  }
  moveBishop() {
    // code for moving bishops
  }
  moveQueen() {
    //code for moving queen
  }
  moveKing() {
    //code for moving king
  }

  //UNFINISHED CODE BELOW

  static createPieces(color) {
    const pieces = [];

    for (let i = 0; i <= 7; i++) {
      pieces.push(
        Piece.createPiece(color === "White" ? BOARD_PIECES.wP : BOARD_PIECES.bP)
      );
    }
    // Order of major pieces (Queen and King)
    const majorPieceOrder = [
      BOARD_PIECES.wR,
      BOARD_PIECES.wN,
      BOARD_PIECES.wB,
      BOARD_PIECES.wQ,
      BOARD_PIECES.wK,
    ];

    // Order of minor pieces (Rooks, Knights, and Bishops)
    const minorPieceOrder = [BOARD_PIECES.wN, BOARD_PIECES.wB, BOARD_PIECES.wR];

    // Create reversed orders for black pieces
    const reverseMajorPieceOrder = majorPieceOrder.slice().reverse();
    const reverseMinorPieceOrder = minorPieceOrder.slice().reverse();

    if (color === "Black") {
      // Add black major pieces in reverse order
      reverseMajorPieceOrder.forEach((pieceType) => {
        const piece = Piece.createPiece(pieceType);
        pieces.push(piece);
      });
      // Add black minor pieces in reverse order
      reverseMinorPieceOrder.forEach((pieceType) => {
        const piece = Piece.createPiece(pieceType);
        pieces.push(piece);
      });
    } else {
      // Add white major pieces
      majorPieceOrder.forEach((pieceType) => {
        const piece = Piece.createPiece(pieceType);
        pieces.push(piece);
      });
      // Add white minor pieces
      minorPieceOrder.forEach((pieceType) => {
        const piece = Piece.createPiece(pieceType);
        pieces.push(piece);
      });
    }

    return pieces;
  }
}
const whitePieces = Player.createPieces("White");
const blackPieces = Player.createPieces("Black");

const whitePlayer = new Player("White", whitePieces);
const blackPlayer = new Player("Black", blackPieces);
console.log(whitePieces);
console.log(blackPieces);

// Object to change the turn for each player;
let playerTurns = {
  white: true,
  black: false,
  changeTurn() {
    this.white = !this.white;
    this.black = !this.black;
  },
};

// function to check if King is in check
function isKingInCheck() {
  //check after each move to see if king is in check, if king is in check, check if king can be saved, if not game over
}

// const squares = document.querySelectorAll('.square');
// const peice = document.querySelector('.peice');

// peice.addEventListener('dragstart', dragstart);
// squares.forEach(square => {
//   square.addEventListener('dragover', dragOver);
//   square.addEventListener('drop', drop)
// });

// let draggedPeice;

// function dragstart(e) {
//   draggedPeice = e.target;
// }

// function dragOver(e) {
//   e.preventDefault();
// }
// function drop(e) {
//   e.target.append(draggedPeice)
// }