"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gateway_controllers_1 = require("../controllers/gateway.controllers");
const express = require('express');
const router = express.Router();
console.log('gateaway route');
router.post('/register', gateway_controllers_1.createUser);
router.post('/login', gateway_controllers_1.login);
router.post('/joinmatch', gateway_controllers_1.playMatch);
router.get('/result', gateway_controllers_1.showResult);
router.get('/Allresults', gateway_controllers_1.showAllResult);
router.get('/players', gateway_controllers_1.getPlayers);
module.exports = router;
//# sourceMappingURL=gateaway.router.js.map