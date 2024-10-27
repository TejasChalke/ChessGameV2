import { useContext, useState } from 'react';
import { GAME_MODE_BOT_TEST, GameContext } from '../../contexts/GameContext'
import './Sidebar.scss'

export default function Sidebar() {
    const { setGameState } = useContext(GameContext);
    const [fen, setFen] = useState("");

    async function startBotTest() {
        try {
            // setup the bot
            const data = {
                mode: GAME_MODE_BOT_TEST,
                fen: fen.trim()
            }
            const response = await fetch("http://localhost:8080/v2/startMatch?mode=" + GAME_MODE_BOT_TEST, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.status === 200) {
                const result = await response.json();
                // set the board as set
                result.gameEnded = false;
                result.boardSet = false;
                result.gameMode = GAME_MODE_BOT_TEST;
                
                console.log("Board State Updated: ", result);
                setGameState(result);

                // handle the moves in board
            } else {
                console.log("Error getting match start data: " + GAME_MODE_BOT_TEST);
            }
        } catch (error) {
            console.log("Error making request to start the game: " + GAME_MODE_BOT_TEST)
        }
    }

    return(
        <div id="sidebar">
            <div id="title">Chess V2</div>
            <div id="inputs">
                <div className="button">Play as White</div>
                <div className="button">Play as Black</div>
                <input type="text" name="fen" id="fen" value={fen} onChange={(e) => setFen(e.target.value)}/>
                <div className="button" onClick={startBotTest}>Start Bot Test</div>
            </div>
        </div>
    )
}