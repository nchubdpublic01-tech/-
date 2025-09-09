import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import GameOverModal from './components/GameOverModal';
import { INSECT_CARDS } from './constants';
import type { CardData, Insect } from './types';
import { InsectType } from './types';

const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

// --- Sound Effects ---
// Create audio elements for sound effects.
const flipSound = new Audio('https://actions.google.com/sounds/v1/cards/card_flip.ogg');
const scoreSound = new Audio('https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg'); // More cheerful score sound
const gameOverWinSound = new Audio('https://actions.google.com/sounds/v1/events/video_game_win.ogg'); // More accomplished win sound
const gameOverLoseSound = new Audio('https://actions.google.com/sounds/v1/crowds/crowd_applause.ogg'); // Cheering sound for time up

// Helper function to play sounds, handling potential browser restrictions.
const playSound = (audio: HTMLAudioElement) => {
    audio.currentTime = 0;
    audio.play().catch(e => console.error("Error playing sound:", e));
};
// --- End Sound Effects ---

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedNames, setMatchedNames] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [gameOverReason, setGameOverReason] = useState<'win' | 'timeup' | null>(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const totalPairs = INSECT_CARDS.length;

  const initializeGame = useCallback(() => {
    const gameCards: Insect[] = [...INSECT_CARDS, ...INSECT_CARDS];
    const shuffledCards = shuffleArray(gameCards).map((insect, index) => ({
      ...insect,
      id: index,
    }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedNames([]);
    setScore(0);
    setTurns(0);
    setIsChecking(false);
    setGameOverReason(null);
    setTimeLeft(90);
    setIsTimerRunning(false); // Timer does not start until the first click
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerRunning || gameOverReason) {
      return;
    }
    if (timeLeft <= 0) {
      setIsTimerRunning(false);
      setGameOverReason('timeup');
      playSound(gameOverLoseSound);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isTimerRunning, gameOverReason]);


  // Effect for checking card matches
  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsChecking(true);
      setTurns(prevTurns => prevTurns + 1);

      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.name === secondCard.name) {
        setMatchedNames(prev => [...prev, firstCard.name]);
        if (firstCard.type === InsectType.BENEFICIAL) {
          setScore(prevScore => prevScore + 10);
          playSound(scoreSound);
        }
        setFlippedIndices([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1200);
      }
    }
  }, [flippedIndices, cards]);

  // Effect for checking win condition
  useEffect(() => {
    if (matchedNames.length > 0 && matchedNames.length === totalPairs) {
      setIsTimerRunning(false);
      playSound(gameOverWinSound);
      setTimeout(() => {
        setGameOverReason('win');
      }, 500);
    }
  }, [matchedNames, totalPairs]);
  
  const handleCardClick = (index: number) => {
    if (gameOverReason || isChecking || flippedIndices.includes(index) || matchedNames.includes(cards[index].name)) {
      return;
    }

    // Start timer on the first click of the game
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    playSound(flipSound);
    setFlippedIndices(prev => [...prev, index]);
  };

  return (
    <div className="min-h-screen bg-lime-50 bg-opacity-50 flex flex-col items-center justify-center p-4 text-gray-800">
       <div className="text-center mb-6">
        <h1 className="font-paytone text-4xl md:text-6xl text-green-700 tracking-wider">Insect Match</h1>
        <h2 className="text-2xl md:text-4xl text-amber-600 font-bold">Memory Game</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Flip the cards to match helpful insects and score points! Matching harmful insects gets you no points.</p>
      </div>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <GameStatus score={score} turns={turns} onRestart={initializeGame} timeLeft={timeLeft} />
        <GameBoard
          cards={cards}
          flippedIndices={flippedIndices}
          matchedNames={matchedNames}
          onCardClick={handleCardClick}
          isChecking={isChecking}
        />
      </div>

      <footer className="text-center text-gray-500 mt-8 text-sm">
        <p>&copy; {new Date().getFullYear()} React Gemini Creations. All rights reserved.</p>
      </footer>

      <GameOverModal
        reason={gameOverReason}
        score={score}
        turns={turns}
        onRestart={initializeGame}
      />
    </div>
  );
};

export default App;