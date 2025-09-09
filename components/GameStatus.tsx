import React from 'react';

interface GameStatusProps {
  score: number;
  turns: number;
  onRestart: () => void;
  timeLeft: number;
}

const StatBox: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
    <div className={`bg-white rounded-xl p-4 text-center shadow-lg ${className}`}>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="font-paytone text-4xl text-gray-800">{value}</p>
    </div>
);


const GameStatus: React.FC<GameStatusProps> = ({ score, turns, onRestart, timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <div className="w-full lg:w-64 grid grid-cols-2 lg:grid-cols-1 gap-4 p-4 bg-lime-200 bg-opacity-40 rounded-2xl shadow-lg">
        <StatBox label="Time" value={timeDisplay} className="text-sky-600 col-span-2 lg:col-span-1" />
        <StatBox label="Score" value={score} className="text-green-600" />
        <StatBox label="Turns" value={turns} className="text-amber-600" />
        <button
            onClick={onRestart}
            className="w-full col-span-2 lg:col-span-1 bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
            Restart
        </button>
    </div>
  );
};

export default GameStatus;