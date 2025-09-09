import type { ReactNode } from 'react';

export enum InsectType {
  BENEFICIAL = 'beneficial',
  HARMFUL = 'harmful',
}

export interface Insect {
  name: string;
  displayName: string;
  type: InsectType;
  icon: ReactNode;
}

export interface CardData extends Insect {
  id: number;
}