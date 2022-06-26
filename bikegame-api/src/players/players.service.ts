/**
 * Data Model Interfaces
 */

import { BasePlayer, Player, PlayerColors } from "./player.interface";
import { Players } from "./players.interface";

/**
 * In-Memory Store
 */

let players: Players = {
  1: {
    id: 1,
    name: "Player 1",
    color: PlayerColors.Red,
  },
  2: {
    id: 2,
    name: "Player 2",
    color: PlayerColors.Blue,
  },
  3: {
    id: 3,
    name: "Player 3",
    color: PlayerColors.Green,
  },
  4: {
    id: 4,
    name: "Player 4",
    color: PlayerColors.Black,
  },
  5: {
    id: 5,
    name: "Player 5",
    color: PlayerColors.White,
  },
  6: {
    id: 6,
    name: "Player 6",
    color: PlayerColors.Pink,
  },
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Player[]> => Object.values(players);

export const find = async (id: number): Promise<Player> => players[id];

export const create = async (newPlayer: BasePlayer): Promise<Player> => {
  const id = Object.keys(players).length + 1;

  players[id] = {
    id,
    ...newPlayer,
  };

  return players[id];
};

export const update = async (
  id: number,
  updatedPlayer: BasePlayer
): Promise<Player | null> => {
  const player = find(id);

  if (!player) {
    return null;
  }

  players[id] = { id, ...updatedPlayer };

  return players[id];
};

export const remove = async (id: number): Promise<Player | null> => {
  const player = find(id);

  if (!player) {
    return null;
  }

  delete players[id];

  return player;
};
