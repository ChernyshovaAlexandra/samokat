import React, { ReactNode, createContext, useState, useCallback } from 'react';

export interface ObstacleType {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  texture: String
}

interface GameContextProps {
  isAnimating: boolean;
  obstacles: ObstacleType[];
  isGameOver: boolean;
  shipPosition: { x: number; y: number, height: number, width: number };
  handleStartAnimation: () => void;
  handleStopAnimation: () => void;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameContext = createContext<GameContextProps>({
  isAnimating: false,
  obstacles: [],
  isGameOver: false,
  shipPosition: { x: 0, y: 0, width: 64, height: 128 },
  handleStartAnimation: () => { },
  handleStopAnimation: () => { },
  setIsGameOver: () => { },
  setIsAnimating: () => { },
});

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [shipPosition, setShipPosition] = useState({ x: 160, y: 400, width: 64, height: 128 });

  const handleStartAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const handleStopAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const contextValue: GameContextProps = {
    isAnimating,
    obstacles: [],
    isGameOver,
    shipPosition,
    handleStartAnimation,
    handleStopAnimation,
    setIsGameOver,
    setIsAnimating
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};
