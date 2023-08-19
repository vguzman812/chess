// Class for Game, which includes the logic for managing the game

import Board from "./board.js";
export default class Game {
  constructor(fen) {
    this.fen = fen;
    this.infoDisplay = document.querySelector("#info-display");
    this.board = new Board();
    this.players = {
      white: new Player("white"),
      black: new Player("black"),
    };
    this.currentPlayer = "white";

    // UI Components
    const gameBoard = document.querySelector("#gameboard");
    const playerDisplay = document.querySelector("#player");
    const allSquares = document.querySelectorAll("#gameboard .board-square");
    let startPositionId;
    let draggedElement;

    playerDisplay.textContent = this.currentPlayer;

    // Add event listeners on UI board
    allSquares.forEach((square) => {
      square.addEventListener("dragstart", this.dragStart);
      square.addEventListener("dragover", this.dragOver);
      square.addEventListener("drop", this.dragDrop);
    });
  }

  startGame() {
    // low priority if even needed.
    // TODO: Start the game
  }

  // start dragging a piece
  dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute("id");
    draggedElement = e.target;
  }

  // prevents selecting of anything that the dragged piece goes over.
  // ensures that we only select the element that piece is over when we let go
  dragOver(e) {
    e.preventDefault();
  }

  displayError(message) {
    this.infoDisplay.textContent = message;
    setTimeout(() => {
      this.infoDisplay.textContent = "";
    }, 3000);
  }
  /*
  TODO RELATED TO THIS FUNCTION:
    HIGH PRIORITY
    1.  We should have a method for displaying errors,
          like displayInfo(info) that changes textContent of infoDisplay for 3 seconds. 
    2.  Put in move validation calls where necessary. One idea would be to wrap all secondary
          conditionals in a single if (isValidMove()){...} conditional and call displayInfo() otherwise
    3.  Anytime we are appending/removing pieces, 
          those should be separate calls to something like takePiece(), movePiece().
  */
  // stop dragging a piece
  dragDrop(e) {
    e.stopPropagation();

    // check if piece that we are picking up is correct color
    const isCorrectPlayer = draggedElement.id.includes(this.currentPlayer);
    // set opponent to other color than current player
    let opponent = this.currentPlayer === "white" ? "black" : "white";

    // check if the square we are dropping into is occupied or is opponent piece
    const squareOccupied = e.target.classList.contains("chess-piece");
    const isOpponentPiece = e.target.id.includes(opponent);

    // need to add conditional here for valid move as well
    // if we have picked up the correct color piece and move is valid
    if (isCorrectPlayer) {
      // if we place it on an opponent piece, remove the opponent piece and put the current piece.
      if (isOpponentPiece) {
        e.target.parentNode.append(draggedElement);
        e.target.remove();
        this.changeTurn();
        return;
      }

      // if square is occupied and it is not opponent piece (meaning it is our own piece)
      // display error for 3 seconds.
      if (squareOccupied) {
        this.displayError("You cannot move here. Invalid Move!");
      }

      // if we move the correct piece onto an empty square, put it there.
      if (e.target.classList.contains("board-square")) {
        e.target.append(draggedElement);
        this.changeTurn();
        return;
      }
    }
  }

  changeTurn() {
    this.currentPlayer === "white"
      ? (this.currentPlayer = "black")
      : (this.currentPlayer = "white");
    playerDisplay.textContent = this.currentPlayer;
  }

  movePiece(piece, to) {
    // high priority
    // TODO: Logic to move a piece. This will likely move a piece after it has been validated and present a new, updated board
  }

  isValidMove(piece, from, to) {
    // High priority
    // TODO: Implement logic to validate if a move is legal. This will likely send a validation call to the board and return true or false
    // so something like Board.validateMove(piece=pawn, from=e6, to=e4) which board would validate if pawns in general can move like that
  }

  updateBoard(fenString) {
    // Medium-High priority
    // TODO: Create and send a fenString to the Board class upon successful move completion so the Board class can update its own board.
  }

  checkGameStatus() {
    // low priority
    // TODO: Implement logic to determine if the game is in checkmate, stalemate, etc.
  }

  isCheck() {
    // low priority
    // TODO: Logic to check if the current player is in check
  }

  isCheckmate() {
    // low priority
    // TODO: Logic to check if the current player is in checkmate
  }

  isStalemate() {
    // low priority
    // TODO: logic to check if the game is a stalemate
  }

  endGame() {
    // low priority
    // TODO: Logic to end the game (e.g., declare a winner, draw, etc.)
  }

  resetGame() {
    // low priority
    // TODO: Logic to reset entire board.
  }

  undoMove() {
    // low priority
    // TODO: Logic to undo the last move
  }
}
