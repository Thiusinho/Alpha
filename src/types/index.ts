export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Fighter {
  id: string;
  userId: string;
  name: string;
  martialArt: MartialArt;
  attributes: Attributes;
  techniques: Technique[];
  activeTechniques: string[];
  wins: number;
  losses: number;
  draws: number;
  ranking: number;
  fightCount: number;
}

export interface Attributes {
  resistance: number;
  dexterity: number;
  technique: number;
  strength: number;
  defense: number;
  unallocated: number;
}

export type MartialArt = 
  | 'karate'
  | 'judô'
  | 'boxe'
  | 'muaythai'
  | 'jiujitsu'
  | 'taekwondo'
  | 'kungfu'
  | 'capoeira';

export interface Technique {
  id: string;
  name: string;
  martialArt: MartialArt;
  damage: number;
  accuracy: number;
  description: string;
  requiredTechnique: number;
  isSpecial: boolean;
}

export interface FightResult {
  id: string;
  date: string;
  player1Id: string;
  player1Name: string;
  player1MartialArt: MartialArt;
  player2Id: string;
  player2Name: string;
  player2MartialArt: MartialArt;
  winnerId: string | null;
  isDraw: boolean;
  isPerfect: boolean;
  player1Damage: number;
  player2Damage: number;
  rounds: FightRound[];
}

export interface FightRound {
  round: number;
  player1Technique?: Technique;
  player2Technique?: Technique;
  player1Damage: number;
  player2Damage: number;
  commentary: string;
}

export interface RankingEntry {
  id: string;
  name: string;
  martialArt: MartialArt;
  wins: number;
  losses: number;
  draws: number;
  winPercentage: number;
  totalPower: number;
}