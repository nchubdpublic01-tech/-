import React from 'react';
import type { CardData } from '../types';
import { InsectType } from '../types';
import { LeafIcon } from '../constants';

interface CardProps {
  cardData: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

const Card: React.FC<CardProps> = ({ cardData, isFlipped, isMatched, onClick, isDisabled }) => {
  const isRevealed = isFlipped || isMatched;

  const cardBaseClasses = 'w-full aspect-square rounded-lg shadow-md cursor-pointer transition-all duration-500';
  const cardPerspectiveClasses = '[transform-style:preserve-3d]';
  const cardFaceClasses = 'absolute w-full h-full flex flex-col items-center justify-center p-2 rounded-lg [backface-visibility:hidden]';
  
  const frontBgColor = cardData.type === InsectType.BENEFICIAL ? 'bg-green-100' : 'bg-red-100';
  const frontBorderColor = cardData.type === InsectType.BENEFICIAL ? 'border-green-500' : 'border-red-500';

  return (
    <div className="w-full aspect-square [perspective:1000px]" onClick={isDisabled ? undefined : onClick}>
      <div className={`${cardBaseClasses} ${cardPerspectiveClasses} ${isRevealed ? '[transform:rotateY(180deg)]' : ''} ${isMatched ? 'cursor-default ring-4 ring-yellow-400' : 'hover:scale-105'}`}>
        {/* Card Back */}
        <div className={`${cardFaceClasses} bg-lime-600 text-white`}>
          <LeafIcon className="w-1/2 h-1/2 text-lime-400" />
        </div>

        {/* Card Front */}
        <div className={`${cardFaceClasses} ${frontBgColor} border-4 ${frontBorderColor} [transform:rotateY(180deg)]`}>
            {cardData.icon}
            <span className="text-xs sm:text-sm font-bold mt-1 text-center text-gray-700">{cardData.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;