"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_controller_1 = require("../controllers/player.controller");
const express = require('express');
const router = express.Router();
console.log('customers route');
router.get('/verify', player_controller_1.isAuthenticated);
router.get('/coins', player_controller_1.getCoins);
router.post('/add_coins', player_controller_1.addCoins);
router.get('/creatures', player_controller_1.getCreatures);
router.get('/player', player_controller_1.getPlayer);
module.exports = router;
//# sourceMappingURL=player.router.js.map