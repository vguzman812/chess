
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
const updateBoardPositions = (fenPosition) => {
  // Mapping of chess pieces to their type and color
  const pieceMap = { 
    'K': { type: 'king', color: 'white' },
    'Q': { type: 'queen', color: 'white' },
    'B': { type: 'bishop', color: 'white' },
    'N': { type: 'knight', color: 'white' },
    'R': { type: 'rook', color: 'white' },
    'P': { type: 'pawn', color: 'white' },

    'k': { type: 'king', color: 'black' },
    'q': { type: 'queen', color: 'black' },
    'b': { type: 'bishop', color: 'black' },
    'n': { type: 'knight', color: 'black' },
    'r': { type: 'rook', color: 'black' },
    'p': { type: 'pawn', color: 'black' }
  }

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

// Example usage

const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const position = fenToPosition(DEFAULT_POSITION);
console.log(position)
updateBoardPositions(position);
