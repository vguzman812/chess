// Constants used in the chess game
// colors for the board
export const COLORS = { white: 0, black: 1, both: 2 };

// I assigned the board with 120 squares for a safety net to prevent off-board moves
export const BOARD_SQUARES = 120;

// Key squares define the start and end of the chessboard within the boardSquares array
export const KEY_SQUARES = {
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
export const FILES = {
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
export const RANKS = {
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

// Define the range for the central 8x8 square
export const START_RANK = RANKS.rank1;
export const END_RANK = RANKS.rank8;
export const START_FILE = FILES.fileA;
export const END_FILE = FILES.fileH;
// start is A1 H1, end is A8 H8

// Here we define the chess peices and assign a corresponding integer
// b - black | w - white
// P - pawn | N - knight | B - bishop | R - rook | Q - queen | K - king
export const BOARD_PIECES = {
    empty: 0,
    //white pieces
    wP: 1,
    wN: 2,
    wB: 3,
    wR: 4,
    wQ: 5,
    wK: 6,
    // black pieces
    bP: 7,
    bN: 8,
    bB: 9,
    bR: 10,
    bQ: 11,
    bK: 12,
};

// Mapping of chess pieces to their type and color
export const PIECE_MAP = {
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

// Order of major pieces (Queen and King)
export const MAJOR_PIECE_ORDER_WHITE = [
    BOARD_PIECES.wR,
    BOARD_PIECES.wN,
    BOARD_PIECES.wB,
    BOARD_PIECES.wQ,
    BOARD_PIECES.wK,
    BOARD_PIECES.wB,
    BOARD_PIECES.wN,
    BOARD_PIECES.wR,
];

export const MAJOR_PIECE_ORDER_BLACK = [
    BOARD_PIECES.bR,
    BOARD_PIECES.bN,
    BOARD_PIECES.bB,
    BOARD_PIECES.bQ,
    BOARD_PIECES.bK,
    BOARD_PIECES.bB,
    BOARD_PIECES.bN,
    BOARD_PIECES.bR,
];