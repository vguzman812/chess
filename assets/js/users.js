// Player constructor to create players(b&w)
class Player {
    constructor(color, pieces) {
      this.color = color;
      this.pieces = pieces;
    }
  
    // Creating pieces and putting them into arrays for each player(W&B)
    static createPieces(color) {
      const pieces = [];
  
      for (let i = 0; i <= 7; i++) {
        pieces.push(
          Piece.createPiece(color === "White" ? BOARD_PIECES.wP : BOARD_PIECES.bP)
        );
      }
  
      if (color === "Black") {
        // Add black major pieces in reverse order
        majorPieceOrderBlack.forEach((pieceType) => {
          const piece = Piece.createPiece(pieceType);
          pieces.push(piece);
        });
        
      } else {
        // Add white major pieces
        majorPieceOrderWhite.forEach((pieceType) => {
          const piece = Piece.createPiece(pieceType);
          pieces.push(piece);
        });
      }
  
      return pieces;
    }
  }