
import React from 'react';
import Card from './Card';
import type { CardData } from '../types';

interface GameBoardProps {
  cards: CardData[];
  flippedIndices: number[];
  matchedNames: string[];
  onCardClick: (index: number) => void;
  isChecking: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, flippedIndices, matchedNames, onCardClick, isChecking }) => {
  return (
    <div className="flex-1 grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-4 p-4 bg-lime-200 bg-opacity-40 rounded-2xl shadow-lg w-full max-w-2xl lg:max-w-none mx-auto">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          cardData={card}
          isFlipped={flippedIndices.includes(index)}
          isMatched={matchedNames.includes(card.name)}
          onClick={() => onCardClick(index)}
          isDisabled={isChecking && !flippedIndices.includes(index)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
