export default class Pieces{
    static None = 0;
    static King = 1;
    static Queen = 2;
    static Pawn = 3;
    static Rook = 4;
    static Knight = 5;
    static Bishop = 6;

    static White = 8;
    static Black = 16;
    static Players = 24;

    static getColor(piece){
        return (piece & Pieces.Players);
    }

    static isWhite(piece){
        return (piece & Pieces.Players) === Pieces.White
    }

    static isBlack(piece){
        return (piece & Pieces.Players) === Pieces.Black
    }

    static isKing(piece){
        return (piece & 7) === Pieces.King
    }

    static isPawn(piece){
        return (piece & 7) === Pieces.Pawn
    }

    static isQueen(piece){
        return (piece & 7) === Pieces.Queen
    }

    static isRook(piece){
        return (piece & 7) === Pieces.Rook
    }

    static isBishop(piece){
        return (piece & 7) === Pieces.Bishop
    }

    static isKnight(piece){
        return (piece & 7) === Pieces.Knight
    }

    static isNone(piece){
        return (piece & 7) === Pieces.None;
    }

    static numToImage = new Map([
        [Pieces.Black | Pieces.Knight, "BlackKnight"],
        [Pieces.Black | Pieces.Queen, "BlackQueen"],
        [Pieces.Black | Pieces.Bishop, "BlackBishop"],
        [Pieces.Black | Pieces.Rook, "BlackRook"],
        [Pieces.Black | Pieces.King, "BlackKing"],
        [Pieces.Black | Pieces.Pawn, "BlackPawn"],
        [Pieces.White | Pieces.Queen, "WhiteQueen"],
        [Pieces.White | Pieces.Knight, "WhiteKnight"],
        [Pieces.White | Pieces.Bishop, "WhiteBishop"],
        [Pieces.White | Pieces.Rook, "WhiteRook"],
        [Pieces.White | Pieces.King, "WhiteKing"],
        [Pieces.White | Pieces.Pawn, "WhitePawn"]
    ]);

    static charToImage = new Map([
        ['n', "BlackKnight"],
        ['q', "BlackQueen"],
        ['b', "BlackBishop"],
        ['r', "BlackRook"],
        ['k', "BlackKing"],
        ['p', "BlackPawn"],
        ['Q', "WhiteQueen"],
        ['N', "WhiteKnight"],
        ['B', "WhiteBishop"],
        ['R', "WhiteRook"],
        ['K', "WhiteKing"],
        ['P', "WhitePawn"]
    ]);

    static charToNumber = new Map([
        ['n', Pieces.Black | Pieces.Knight],
        ['q', Pieces.Black | Pieces.Queen],
        ['b', Pieces.Black | Pieces.Bishop],
        ['r', Pieces.Black | Pieces.Rook],
        ['k', Pieces.Black | Pieces.King],
        ['p', Pieces.Black | Pieces.Pawn],
        ['Q', Pieces.White | Pieces.Queen],
        ['N', Pieces.White | Pieces.Knight],
        ['B', Pieces.White | Pieces.Bishop],
        ['R', Pieces.White | Pieces.Rook],
        ['K', Pieces.White | Pieces.King],
        ['P', Pieces.White | Pieces.Pawn]
    ]);

    static isSameColor(piece, currPlayer) {
        return (Pieces.Players & currPlayer & piece) !== 0;
    }
}