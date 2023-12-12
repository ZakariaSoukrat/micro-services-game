"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPlayer = void 0;
const node_localstorage_1 = __importDefault(require("node-localstorage"));
const sessionStorage = node_localstorage_1.default.sessionStorage;
async function verifyPlayer() {
    const storedSessionData = JSON.parse(sessionStorage.getItem('sessionData'));
    return storedSessionData;
}
exports.verifyPlayer = verifyPlayer;
//# sourceMappingURL=player.controller.js.map