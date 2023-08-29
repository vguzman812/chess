import {
  KEY_SQUARES,
  BOARD_SQUARES,
  START_RANK,
  END_RANK,
  START_FILE,
  END_FILE,
  PIECE_MAP,
} from "./constants.js";
import Piece from "./pieces.js";

/*

  READ ME if you will work on this class.

  This Board class should be a mental model of the chessboard displayed in the HTML.
  That means that this Board class will handle making the mental model of the chessboard, 
  updating it's own mental model of the chessboard to mirror what is seen on the html side,
  and using it's own mental model to validate moves. 
  When validating moves, we currently should just return whether a move is possible or not.
  In the future, we can update methods to show in the html what the possible moves for a piece are.
  In the future, this board class will also likely check for if a move results in a change in game state,
  such as if a move results in check or checkmate or stalemate.
  I think it will be more accurate if this class updates its' own mental model of the board by
  receiving a fen string from the Game class whenever there is a successful move. This gets rid of
  the possibility of false positives from validating moves here and immediately updating the board here.
  Again, this class should not alter any html for now.

*/

export default class Board {
  constructor() {
    this.boardArray = this.createBoard();
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
  }

  // const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  // Function to convert Forsyth Edwards Notation (FEN) to a chessboard position
  fenToPosition(fen) {
    // Split the FEN string into individual components
    const [
      position,
      colorActive,
      castlingAvail,
      enPassant,
      halfMove,
      fullMoveNum,
    ] = fen.split(" ");

    // Convert the position part of the FEN string into rows
    const rows = position.split("/").map((row) => {
      return row.split("").reduce((acc, char) => {
        // Check if the current character is a letter (chess piece)
        if (isNaN(char)) {
          acc.push(char);
        } else {
          // If the character is a number, fill with empty strings that number of times (empty squares)
          acc = acc.concat(Array(Number(char)).fill(""));
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
      fullMoveNum,
    };
  }

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
          this.updateSquare(squareId, piece);
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
      squareId.innerHTML = "";
      const newPiece = new Piece();
      const pieceElement = newPiece.createPieceElement(
        color,
        type,
        squareId.id
      );
      // Append the piece to the current square
      squareId.appendChild(pieceElement);
    } else {
      squareId.innerHTML = "";
    }
  }

  // Function to return the index of the current square
  fileRankBoard(file, rank) {
    return 21 + file + rank * 10;
  }

  validateMove(piece, from, to) {
    // high priority
    // TODO: Implement a switch case to validate move based on piece type
    // These validation functions should be checking to see if the move is valid, not if the square is occupied or not.
    // for instance, check pawn would make sure that the user is trying to move the pawn two spaces forward if the pawn has not been
    // moved yet,
    // or one space forward if it has been moved
    // or one space forward and one space left or right (diagonal)
    // validatePawn does not currently need to check if there is something on the diagonal move, only that the move is a valid pawn move in general
    if (isValidPawnMove(isWhitePawn, sourceSquare, targetSquare)) {
    }

    // Reset source and target squares
    sourceSquare = null;
    targetSquare = null;
  }

  validatePawn(isWhitePawn, sourceSquare, targetSquare) {
    // TODO: Implement logic to check if the move is a valid one for pawns.
    // Extract row and column indices from source and target squares
    const sourceRow = parseInt(sourceSquare.dataset.row);
    const sourceCol = parseInt(sourceSquare.dataset.col);
    const targetRow = parseInt(targetSquare.dataset.row);
    const targetCol = parseInt(targetSquare.dataset.col);

    // Determine the direction of pawn movement (forward or backward based on its color)
    const forwardDirection = isWhitePawn ? 1 : -1;

    // Calculate the absolute difference in row and column indices
    const rowDiff = forwardDirection * (targetRow - sourceRow);
    const colDiff = Math.abs(targetCol - sourceCol);

    // Pawn's first move can be two squares forward
    if (
      rowDiff === 2 &&
      colDiff === 0 &&
      ((isWhitePawn && sourceRow === 2) || (!isWhitePawn && sourceRow === 7))
    ) {
      return true;
    }

    // Pawn's regular move is one square forward
    if (rowDiff === 1 && colDiff === 0) {
      return true;
    }

    // Pawn can capture diagonally one square forward
    if (rowDiff === 1 && colDiff === 1) {
      return true;
    }

    // Implement en passant capturing if needed

    // If none of the above conditions are met, it's an invalid move
    return false;
  }

  validateKnight(from, to) {
    // TODO: Implement logic to check if the move is a valid one for knights.
  }

  validateBishop(from, to) {
    // TODO: Implement logic to check if the move is a valid one for bishops.
  }

  validateRook(sourceSquare, targetSquare) {
    // TODO: Implement logic to check if the move is a valid one for rooks.
  }
  validateQueen(from, to) {
    // TODO: Implement logic to check if the move is a valid one for queens.
  }

  validateKing(sourceSquare, targetSquare) {
    // Extract row and column indices from source and target squares
    const sourceRow = parseInt(sourceSquare.dataset.row);
    const sourceCol = parseInt(sourceSquare.dataset.col);
    const targetRow = parseInt(targetSquare.dataset.row);
    const targetCol = parseInt(targetSquare.dataset.col);

    // Calculate the absolute difference in row and column indices
    const rowDiff = Math.abs(targetRow - sourceRow);
    const colDiff = Math.abs(targetCol - sourceCol);

    // A valid king move is one where the king moves one square in any direction
    if (
      (rowDiff === 1 && colDiff === 0) || // Vertical move
      (rowDiff === 0 && colDiff === 1) || // Horizontal move
      (rowDiff === 1 && colDiff === 1)
    ) {
      // Diagonal move
      return true;
    }

    // If none of the above conditions are met, it's an invalid move
    return false;
  }

  highlightMoves(piece) {
    // low priority
    // TODO: Implement logic to highlight possible moves for a given piece
  }

  clearHighlights() {
    // low priority
    // TODO: Logic to clear any highlighted squares
  }

  drawLegalMoves(piece, square) {
    // low priortiy
    // TODO: Logic to highlight or show legal moves for a selected piece
  }
}

// Example usage

const board = new Board();
console.log(board);
console.log(board.boardArray);
console.log(board.boardArray[22]);
console.log(board.boardArray[KEY_SQUARES.e8]);
console.log(board.boardArray[KEY_SQUARES.f1]);
const DEFAULT_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const position = board.fenToPosition(DEFAULT_POSITION);
console.log(position.position);
board.updateBoardPositions(position);
