import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface GameState {
  score: number;
  highScore: number;
  lastScore: number;
  currentLevel: number;
  requiredPoints: number;
  elapsedTime: number;
  totalTime: number;
  isGameActive: boolean;
}

export type GameAction =
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'SET_HIGH_SCORE'; payload: number }
  | { type: 'SET_LAST_SCORE'; payload: number }
  | { type: 'SET_LEVEL'; payload: number }
  | { type: 'SET_REQUIRED_POINTS'; payload: number }
  | { type: 'SET_ELAPSED_TIME'; payload: number }
  | { type: 'SET_TOTAL_TIME'; payload: number }
  | { type: 'SET_GAME_ACTIVE'; payload: boolean }
  | { type: 'RESET_GAME' }
  | { type: 'INCREMENT_SCORE' }
  | { type: 'INCREMENT_TIME' };

const initialState: GameState = {
  score: 0,
  highScore: 0,
  lastScore: 0,
  currentLevel: 1,
  requiredPoints: 0,
  elapsedTime: 0,
  totalTime: 0,
  isGameActive: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    case 'SET_HIGH_SCORE':
      return { ...state, highScore: action.payload };
    case 'SET_LAST_SCORE':
      return { ...state, lastScore: action.payload };
    case 'SET_LEVEL':
      return { ...state, currentLevel: action.payload };
    case 'SET_REQUIRED_POINTS':
      return { ...state, requiredPoints: action.payload };
    case 'SET_ELAPSED_TIME':
      return { ...state, elapsedTime: action.payload };
    case 'SET_TOTAL_TIME':
      return { ...state, totalTime: action.payload };
    case 'SET_GAME_ACTIVE':
      return { ...state, isGameActive: action.payload };
    case 'RESET_GAME':
      return { ...initialState, highScore: state.highScore };
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + 1 };
    case 'INCREMENT_TIME':
      return { ...state, totalTime: state.totalTime + 1 };
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
