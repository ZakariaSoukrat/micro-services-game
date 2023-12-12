"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_controller_1 = require("../controllers/player.controller");
const express = require('express');
const router = express.Router();
console.log('player route');
router.post('/verify', player_controller_1.verifyPlayer);
module.exports = router;
//# sourceMappingURL=player.router.js.map