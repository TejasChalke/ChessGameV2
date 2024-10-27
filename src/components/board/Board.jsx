import { useCallback, useContext, useEffect, useState } from "react"
import './Board.scss'
import { GAME_MODE_BOT_TEST, GAME_MODE_NOT_STARTED, GameContext } from "../../contexts/GameContext";
import Pieces from "../../misc/Pieces";

export default function Board() {
    const squareSize = 80;
    const [squares, setSquares] = useState([]);
    const { gameState, setGameState } = useContext(GameContext);

    useEffect(() => {
        let tempSquares = [];
        for (let rank=0; rank<8; rank++) {
            for (let file=0; file<8; file++) {
                tempSquares.push({
                    xOffset: file * squareSize,
                    yOffset: (7 - rank) * squareSize,
                    color: rank % 2 === file % 2 ? "#769656" : "#eeeed2",
                    showDot: false,
                    image: null,
                    size: squareSize
                });
            }
        }
        setSquares(tempSquares);
    }, []);

    useEffect(() => {
        if (gameState.gameMode === GAME_MODE_NOT_STARTED || gameState.gameEnded) return;
        if (!gameState.boardSet) {
            let board = gameState.board.split(".");
            let tempSquares = [];
            for (let index=0; index<64; index++) {
                const rank = Math.floor(index / 8), file = index % 8;
                const currentSquare = {
                    xOffset: file * squareSize,
                    yOffset: (7 - rank) * squareSize,
                    color: rank % 2 === file % 2 ? "#769656" : "#eeeed2",
                    showDot: false,
                    image: null,
                    size: squareSize
                };

                const piece = parseInt(board[index]);
                if (piece !== 0) {
                    currentSquare.image = Pieces.numToImage.get(piece)
                }
                tempSquares.push(currentSquare);
            }
            setSquares(tempSquares);
            setGameState(prev => ({...prev, boardSet: true}));
        }
    }, [gameState, setGameState])

    async function getBotMove() {
        try {
            const response = await fetch("http://localhost:8080/v2/playMove");

            if (response.status === 200) {
                const move = await response.json();
                return move;
            } else {
                console.error("Error making move on the server");
                return null;
            }
        } catch (e) {
            console.log("Error getting bot move: " + e);
            return null;
        }
    }

    const memoMakeMove = useCallback(makeMove, [squares]);

    useEffect(() => {
        // if testing bots keep playing until game ends
        if (!gameState.gameEnded && gameState.boardSet && gameState.gameMode === GAME_MODE_BOT_TEST) {
            getBotMove()
            .then(move => {
                if (move !== null && move.startingSquare !== -1 && move.startingSquare !== 64) {
                    setTimeout(() => {
                        // adding a delay for testing
                        memoMakeMove(move);
                        console.log("Fetching next move");
                        setGameState(prev => ({...prev, whiteToMove: !prev.whiteToMove}));
                    }, 500)
                }
                else setGameState(prev => ({...prev, gameEnded: true}))
            })           
        }
    }, [gameState, setGameState, memoMakeMove])
    
    function makeMove(move) {
        let temp = [...squares];
        temp[move.targetSquare].image = temp[move.startingSquare].image;
        temp[move.startingSquare].image = null;

        if (move.isEnPassant) {
            if (move.startingSquare < move.targetSquare) {
                // white played en passant
                temp[move.targetSquare - 8].image = null;
            } else {
                // black played en passan
                temp[move.targetSquare + 8].image = null;
            }
        }

        if (move.isCastle) {
            if (move.startingSquare < move.targetSquare) {
                // king side castling
                temp[move.targetSquare - 1].image = temp[move.targetSquare + 1].image;
                temp[move.targetSquare + 1].image = null;
            } else {
                // queen side castling
                temp[move.targetSquare + 1].image = temp[move.targetSquare - 2].image;
                temp[move.targetSquare - 2].image = null;
            }
        }

        if (move.isPromoteToQueen) {
            if (move.targetSquare >= 56) {
                // white promotion
                temp[move.targetSquare].image = "WhiteQueen"
            } else {
                // black promotion
                temp[move.targetSquare].image = "BlackQueen"
            }
        }
        else if (move.isPromoteToBishop) {
            if (move.targetSquare >= 56) {
                // white promotion
                temp[move.targetSquare].image = "WhiteBishop"
            } else {
                // black promotion
                temp[move.targetSquare].image = "BlackBishop"
            }
        }
        else if (move.isPromoteToKnight) {
            if (move.targetSquare >= 56) {
                // white promotion
                temp[move.targetSquare].image = "WhiteKnight"
            } else {
                // black promotion
                temp[move.targetSquare].image = "BlackKnight"
            }
        }
        else if (move.isPromoteToRook) {
            if (move.targetSquare >= 56) {
                // white promotion
                temp[move.targetSquare].image = "WhiteRook"
            } else {
                // black promotion
                temp[move.targetSquare].image = "BlackRook"
            }
        }
        setSquares(temp);
    }

    return(
        <div id="boardContainer">
            <div id="board" style={{width:`${squareSize * 8}px`, height:`${squareSize * 8}px`}}>
                {
                    squares !== undefined && squares.length > 0 &&
                    squares.map((square, index) => {
                        return <Square data={square} key={index} i={index}/>
                    })
                }
            </div>
        </div>
    )
}

function Square(props) {
    const style = {
        backgroundColor: props.data.color,
        transform: `translate(${props.data.xOffset}px, ${props.data.yOffset}px)`,
        height: `${props.data.size}px`,
        width: `${props.data.size}px`
    }

    const image = props.data.image !== null ? `/images/${props.data.image}.png` : null;
    return (
        <div className="square" style={style}>
            {
                image !== null &&
                <img src={image} alt={props.image} />
            }
        </div>
    )
}