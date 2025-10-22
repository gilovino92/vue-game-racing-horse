// Game Status Management
export const GameStatuses = {
  NONE: 'none',
  IDLE: 'idle',
  PREPARING: 'preparing',
  RACING: 'racing',
  PAUSED: 'paused',
  COMPLETED: 'completed'
} as const;

export type GameStatus = typeof GameStatuses[keyof typeof GameStatuses];

// Core Entities
export interface Horse {
  readonly id: number; // also horse's index in array
  readonly name: string;
  readonly color: string;
  readonly condition: number; // 1-100
}

export interface Lane {
  readonly laneNumber: number;
  horsePosition: number; // in percentage (0-100%)
  horseId: number;
  resultTime: number;
  ranking: number;
}

export interface Round {
  roundNumber: number;
  distance: number;
  lanes: Lane[];
}

export interface RaceSchedule {
  rounds: Round[];
}

export interface RaceRanking {
  horseId: number;
  rank: number;
}

export interface RaceResult {
  roundNumber: number;
  distance: number;
  rankings: RaceRanking[];
  exhaustedHorses: { horseId: number }[];
}

// Store Types
export interface GameModuleState {
  gameStatus: GameStatus;
  horses: Horse[];
  raceSchedule: RaceSchedule | null;
  currentRoundNumber: number;
  gameInterval: number | null;
  raceResults: RaceResult[];
}

export interface RootState {
  game: GameModuleState;
}