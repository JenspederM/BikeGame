"use strict";
/**
 * Data Model Interfaces
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
const player_interface_1 = require("./player.interface");
/**
 * In-Memory Store
 */
let players = {
    1: {
        id: 1,
        name: "Player 1",
        color: player_interface_1.PlayerColors.Red,
    },
    2: {
        id: 2,
        name: "Player 2",
        color: player_interface_1.PlayerColors.Blue,
    },
    3: {
        id: 3,
        name: "Player 3",
        color: player_interface_1.PlayerColors.Green,
    },
    4: {
        id: 4,
        name: "Player 4",
        color: player_interface_1.PlayerColors.Black,
    },
    5: {
        id: 5,
        name: "Player 5",
        color: player_interface_1.PlayerColors.White,
    },
    6: {
        id: 6,
        name: "Player 6",
        color: player_interface_1.PlayerColors.Pink,
    },
};
/**
 * Service Methods
 */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(players); });
exports.findAll = findAll;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () { return players[id]; });
exports.find = find;
const create = (newPlayer) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Object.keys(players).length + 1;
    players[id] = Object.assign({ id }, newPlayer);
    return players[id];
});
exports.create = create;
const update = (id, updatedPlayer) => __awaiter(void 0, void 0, void 0, function* () {
    const player = (0, exports.find)(id);
    if (!player) {
        return null;
    }
    players[id] = Object.assign({ id }, updatedPlayer);
    return players[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = (0, exports.find)(id);
    if (!player) {
        return null;
    }
    delete players[id];
    return player;
});
exports.remove = remove;
