import { useState } from "react";
import Board from "../board/Board";
import Sidebar from "../sidebar/Sidebar";
import './Homepage.scss'
import { defaultGameState, GameContext } from "../../contexts/GameContext";

export default function Homepage() {
    const [gameState, setGameState] = useState(defaultGameState);

    return(
        <GameContext.Provider value={{gameState, setGameState}}>
            <div id="homepage">
                <Sidebar />
                <Board />
            </div>
        </GameContext.Provider>
    )
}