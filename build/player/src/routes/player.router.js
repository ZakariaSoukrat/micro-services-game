"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_controller_1 = require("../controllers/player.controller");
const express = require('express');
const router = express.Router();
console.log('customers route');
router.get('/verify', player_controller_1.isAuthenticated);
module.exports = router;
//# sourceMappingURL=player.router.js.map