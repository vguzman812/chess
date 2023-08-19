

  // Class for Game, which includes the logic for managing the game
  class Game {
    constructor(fen) {
      this.fen = fen;
      this.board = new Board();
      this.players = {
        white: new Player('white'),
        black: new Player('black'),
      };
      this.playerTurns = {
        white: true,
        black: false,
      };
    }

    startGame() {
      // Start the game
    }

    movePiece(piece, to) {
      // Logic to move a piece
    }

    changeTurn() {
      this.playerTurns.white = !this.playerTurns.white;
      this.playerTurns.black = !this.playerTurns.black;
    }
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

