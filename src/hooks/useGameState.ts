import { useState, useEffect } from 'react';

interface GameState {
  coins: number;
  cursedUntil: number | null;
  dontKnowCount: number;
  dontKnowLocked: boolean;
}

const STORAGE_KEY = 'betal-game-state';
const CURSE_DURATION = 30000; // 30 seconds
const MAX_DONT_KNOW = 3;

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if curse has expired
        if (parsed.cursedUntil && Date.now() > parsed.cursedUntil) {
          parsed.cursedUntil = null;
        }
        return parsed;
      } catch {
        // If parsing fails, return default state
      }
    }
    return {
      coins: 0,
      cursedUntil: null,
      dontKnowCount: 0,
      dontKnowLocked: false,
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const addCoin = () => {
    setGameState(prev => ({ ...prev, coins: prev.coins + 1 }));
  };

  const applyCurse = () => {
    setGameState(prev => ({ 
      ...prev, 
      cursedUntil: Date.now() + CURSE_DURATION 
    }));
  };

  const useDontKnow = () => {
    setGameState(prev => {
      const newCount = prev.dontKnowCount + 1;
      return {
        ...prev,
        dontKnowCount: newCount,
        dontKnowLocked: newCount >= MAX_DONT_KNOW,
      };
    });
  };

  const isCursed = () => {
    return gameState.cursedUntil !== null && Date.now() < gameState.cursedUntil;
  };

  const getCurseTimeRemaining = () => {
    if (!gameState.cursedUntil) return 0;
    return Math.max(0, gameState.cursedUntil - Date.now());
  };

  const resetGame = () => {
    setGameState({
      coins: 0,
      cursedUntil: null,
      dontKnowCount: 0,
      dontKnowLocked: false,
    });
  };

  return {
    coins: gameState.coins,
    isCursed: isCursed(),
    curseTimeRemaining: getCurseTimeRemaining(),
    dontKnowCount: gameState.dontKnowCount,
    dontKnowLocked: gameState.dontKnowLocked,
    maxDontKnow: MAX_DONT_KNOW,
    addCoin,
    applyCurse,
    useDontKnow,
    resetGame,
  };
};