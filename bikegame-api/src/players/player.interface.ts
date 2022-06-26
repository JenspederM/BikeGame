export enum PlayerColors {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Black = "black",
  White = "white",
  Pink = "pink",
}

export interface BasePlayer {
  name: string;
  color: PlayerColors;
}

export interface Player extends BasePlayer {
  id: number;
}
