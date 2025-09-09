import React from 'react';
import type { Insect } from './types';
import { InsectType } from './types';

export const LeafIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.635 2.246a1 1 0 0 1 1.253.272l2.93 4.101a.75.75 0 0 0 .937.243l3.24-1.296a1 1 0 0 1 1.258.835l.89 4.896a1 1 0 0 1-.948 1.13l-4.72.858a.75.75 0 0 0-.493.493l-.858 4.72a1 1 0 0 1-1.13.948l-4.896-.89a1 1 0 0 1-.835-1.258l1.296-3.24a.75.75 0 0 0-.243-.937l-4.1-2.93a1 1 0 0 1-.273-1.253l2.858-5.145a1 1 0 0 1 1.23-.554l5.433 1.94a.75.75 0 0 0 .62-.058L11.635 2.246z" />
    </svg>
);


export const INSECT_CARDS: Insect[] = [
  {
    name: 'Bee',
    displayName: 'Bee',
    type: InsectType.BENEFICIAL,
    icon: <div className="text-5xl">🐝</div>,
  },
  {
    name: 'Ladybug',
    displayName: 'Ladybug',
    type: InsectType.BENEFICIAL,
    icon: <div className="text-5xl">🐞</div>,
  },
  {
    name: 'Butterfly',
    displayName: 'Butterfly',
    type: InsectType.BENEFICIAL,
    icon: <div className="text-5xl">🦋</div>,
  },
  {
    name: 'Spider',
    displayName: 'Spider',
    type: InsectType.BENEFICIAL,
    icon: <div className="text-5xl">🕷️</div>,
  },
  {
    name: 'Beetle',
    displayName: 'Beetle',
    type: InsectType.BENEFICIAL,
    icon: <div className="text-5xl">🪲</div>,
  },
  {
    name: 'Worm',
    displayName: 'Worm',
    type: InsectType.BENEFICIAL,
    icon: <div className="text-5xl">🪱</div>,
  },
  {
    name: 'Ant',
    displayName: 'Ant',
    type: InsectType.HARMFUL,
    icon: <div className="text-5xl">🐜</div>,
  },
  {
    name: 'Grasshopper',
    displayName: 'Grasshopper',
    type: InsectType.HARMFUL,
    icon: <div className="text-5xl">🦗</div>,
  },
  {
    name: 'Caterpillar',
    displayName: 'Caterpillar',
    type: InsectType.HARMFUL,
    icon: <div className="text-5xl">🐛</div>,
  },
  {
    name: 'Mosquito',
    displayName: 'Mosquito',
    type: InsectType.HARMFUL,
    icon: <div className="text-5xl">🦟</div>,
  },
];