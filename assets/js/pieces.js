import { BOARD_PIECES } from "./constants.js";

// Class to represent a chess piece
export default class Piece {
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


    // I don't know that this needs to be here unless for creating a new piece like for pawn promotion
    // Function to create an HTML element for a chess piece
    /*
    createPieceElement(color, pieceType, square) {
        // Create piece element with dynamic template strings
        const pieceElement = document.createElement('img');
        pieceElement.src = `assets/images/chess-${pieceType}-${color === 'white' ? 'regular' : 'solid'}.svg`
        pieceElement.alt = `${color} ${pieceType}`
        pieceElement.id = `${color}-${pieceType}-${square}`;
        pieceElement.className = 'chess-piece';
        return pieceElement;
    }
    */

}


const whitePawn = Piece.createPiece(BOARD_PIECES.wP);
console.log(whitePawn);