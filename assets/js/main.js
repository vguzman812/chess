/* 
This file is for linking and responsiveness purposes only. 
NO CHESS LOGIC HERE OTHER THAN INITIALIZATION CALLS.
*/

//tested to see if counter logic would work to implement turn system
//^^
// let whitesCounter = 0;
// let blacksCounter = 0;

// let counterWhite = () => {
//   whitesCounter++;
// };

// let counterBlack = () => {
//   blacksCounter++;
// };

// document.getElementById("box1").addEventListener("click", counterWhite);
// document.getElementById("box2").addEventListener("click", counterBlack);

// console.log(whitesCounter, blacksCounter);

// implement turn system for players//
// when white makes the first, only black can move,
//
//
//
// keep track of state.
// move pawn forward once,
// we can make two counters, white counter, black counter
// white moves counter goes up 1
// if whiteCounter is more than blackCounter, white cannot move
// if counter == counterB white moves
// eventListener

// Array for each square on board 8x8;
let chessBoard = [
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
];

// Pieces constructor to create each piece as needed.
class Piece {
  constructor(type, color) {
    this.type = type;
    this.color = color;
  }
}

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
}

// function to check if King is in check
function isKingInCheck() {
  //check after each move to see if king is in check, if king is in check, check if king can be saved, if not game over
}
