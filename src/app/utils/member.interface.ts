export interface Member {
  rank: number;
  name: string;
  level: Level;
}

export enum Level {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
}
