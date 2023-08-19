import { BOARD_PIECES, MAJOR_PIECE_ORDER_BLACK, MAJOR_PIECE_ORDER_WHITE } from "./constants.js";

// Player constructor to create players(b&w)
export default class Player {
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
            MAJOR_PIECE_ORDER_BLACK.forEach((pieceType) => {
                const piece = Piece.createPiece(pieceType);
                pieces.push(piece);
            });

        } else {
            // Add white major pieces
            MAJOR_PIECE_ORDER_WHITE.forEach((pieceType) => {
                const piece = Piece.createPiece(pieceType);
                pieces.push(piece);
            });
        }

        return pieces;
    }


    resign() {
        // low priority
        // TODO: Logic for resigning
    }

    offerDraw() {
        // low priority
        // TODO: Logic for offering a draw
    }

    acceptDraw() {
        // low priority
        // TODO: Logic for accepting a draw
    }


}

const whitePlayer = new Player("White", whitePieces);
const blackPlayer = new Player("Black", blackPieces);
console.log(whitePlayer);
console.log(blackPlayer);

const whitePieces = Player.createPieces("White");
const blackPieces = Player.createPieces("Black");
console.log(whitePieces)
console.log(blackPieces)