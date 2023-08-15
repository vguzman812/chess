

const fenToPosition = (fen) => {
  const [ position, colorActive, castlingAvail, enPassant, halfMove, fullMoveNum ] = fen.split(' ');

  // Map through each char of the fen string and place peices/empty in correct order
  const rows = position.split('/').map(row => {
    return row.split('').reduce((acc, char) => {
      // Check if current char is a letter
      if(isNaN(char)) {
        acc.push(char)
      } else {
        // If piece is a number, fill with empty string num amount of times
        acc = acc.concat(Array(Number(char)).fill(''));
      }
      return acc;
    }, []);
  })

  const chessboard = {};
  // Place pieces in board squares
  rows.forEach((row, rankIndex) => {
    row.forEach((piece, fileIndex) => {
      if (piece) {
        // Convert files to ascii value, starting with 'A' - 65; Ranks 8 through 1
        const square = String.fromCharCode(65 + fileIndex) + (8 - rankIndex);
        chessboard[square] = piece
      }
    })
  })

  return {
    position: chessboard,
    colorActive,
    castlingAvail,
    enPassant,
    halfMove,
    fullMoveNum
  }
}



const updateBoardPositions = (fenPosition) => {
  // Map values for pieces
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

  const createPieceElement = (color, pieceType, square) => {
    // Create piece element with dynamic template strings
    const pieceElement = document.createElement('img');
    pieceElement.src = `assets/images/chess-${pieceType}-${color === 'white' ? 'regular' : 'solid' }.svg`
    pieceElement.alt = `${color} ${pieceType}`
    pieceElement.id = `${color}-${pieceType}-${square}`;
    pieceElement.className = 'chess-piece';
    return pieceElement;
  }

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

  // Loop through each square on the board
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

const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const position = fenToPosition(DEFAULT_POSITION);
console.log(position)
updateBoardPositions(position);
