// Definitions of chess pieces

// Class to represent a chess piece
class Piece {
    constructor(type, color) {
      this.type = type;
      this.color = color;
    }
  
    // Create board pieces using the BOARD_PIECES constant
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