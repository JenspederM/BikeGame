/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as playerService from "./players.service";
import { BasePlayer, Player } from "./player.interface";

/**
 * Router Definition
 */

export const playersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET players

playersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const players = await playerService.findAll();
    res.status(200).send(players);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET players/:id
playersRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const player = await playerService.find(id);

    if (player) {
      res.status(200).send(player);
    } else {
      res.status(404).send("Player not found");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST players
playersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const player: BasePlayer = req.body;
    const newPlayer = await playerService.create(player);
    res.status(201).send(newPlayer);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// PUT players/:id
playersRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const playerUpdate: Player = req.body;
    const existingPlayer: Player = await playerService.find(id);

    if (existingPlayer) {
      const updatedPlayer = await playerService.update(id, playerUpdate);
      return res.status(200).send(updatedPlayer);
    } else {
      const newPlayer = await playerService.create(playerUpdate);
      res.status(201).send(newPlayer);
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// DELETE players/:id
playersRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const player = await playerService.find(id);

    if (player) {
      await playerService.remove(id);
      res.status(204).send(player);
    } else {
      res.status(404).send("Player not found");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
