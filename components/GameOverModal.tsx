import React from 'react';

interface GameOverModalProps {
  reason: 'win' | 'timeup' | null;
  score: number;
  turns: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ reason, score, turns, onRestart }) => {
  if (!reason) {
    return null;
  }

  const isWin = reason === 'win';
  const title = isWin ? "Good Job!" : "Time's Up!";
  const message = isWin ? "You found all the matches!" : "Better luck next time!";
  const titleColor = isWin ? "text-green-700" : "text-amber-700";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-lime-50 rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full transform transition-all scale-95 animate-modal-pop-in">
        <h2 className={`font-paytone text-4xl ${titleColor} mb-2`}>{title}</h2>
        <p className="text-gray-600 mb-6 text-lg">{message}</p>
        
        <div className="flex justify-around mb-8">
            <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Final Score</p>
                <p className="font-paytone text-5xl text-green-600">{score}</p>
            </div>
            <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Total Turns</p>
                <p className="font-paytone text-5xl text-amber-600">{turns}</p>
            </div>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-lg"
        >
          Play Again
        </button>
      </div>
      <style>{`
        @keyframes modal-pop-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modal-pop-in {
            animation: modal-pop-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GameOverModal;