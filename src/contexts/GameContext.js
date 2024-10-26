import { createContext } from "react"

const GAME_MODE_BOT_TEST = "BotTest";
const GAME_MODE_BOT_VS_WHITE = "BOT_VS_WHITE";
const GAME_MODE_BOT_VS_BLACK = "BOT_VS_BLACK";
const GAME_MODE_PLAYERS = "PLAYERS";
const GAME_MODE_NOT_STARTED = "NOT_STARTED";

const defaultGameState = {
    board: [],
    whiteToMove: true,
    boardSet: false,
    gameEnded: true,
    gameMode: GAME_MODE_NOT_STARTED
}

const GameContext = createContext({
    gameState: defaultGameState,
    setGameState: () => {}
});

export {defaultGameState, GameContext, GAME_MODE_BOT_TEST, GAME_MODE_BOT_VS_WHITE, GAME_MODE_BOT_VS_BLACK, GAME_MODE_PLAYERS, GAME_MODE_NOT_STARTED};