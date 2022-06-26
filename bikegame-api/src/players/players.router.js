"use strict";
/**
 * Required External Modules and Interfaces
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playersRouter = void 0;
const express_1 = __importDefault(require("express"));
const playerService = __importStar(require("./players.service"));
/**
 * Router Definition
 */
exports.playersRouter = express_1.default.Router();
/**
 * Controller Definitions
 */
// GET players
exports.playersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield playerService.findAll();
        res.status(200).send(players);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// GET players/:id
exports.playersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const player = yield playerService.find(id);
        if (player) {
            res.status(200).send(player);
        }
        else {
            res.status(404).send("Player not found");
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// POST players
exports.playersRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = req.body;
        const newPlayer = yield playerService.create(player);
        res.status(201).send(newPlayer);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// PUT players/:id
exports.playersRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const playerUpdate = req.body;
        const existingPlayer = yield playerService.find(id);
        if (existingPlayer) {
            const updatedPlayer = yield playerService.update(id, playerUpdate);
            return res.status(200).send(updatedPlayer);
        }
        else {
            const newPlayer = yield playerService.create(playerUpdate);
            res.status(201).send(newPlayer);
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// DELETE players/:id
exports.playersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const player = yield playerService.find(id);
        if (player) {
            yield playerService.remove(id);
            res.status(204).send(player);
        }
        else {
            res.status(404).send("Player not found");
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
