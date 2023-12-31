"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_controller_1 = require("../controllers/match.controller");
const express = require('express');
const router = express.Router();
console.log('customers route');
router.post('/playMatch', match_controller_1.playMatch);
router.get('/getAllResults', match_controller_1.getAllMatches);
router.get('/getResults', match_controller_1.getLastMatches);
module.exports = router;
//# sourceMappingURL=match.router.js.map