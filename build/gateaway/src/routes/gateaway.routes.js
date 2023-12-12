"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gateway_controllers_1 = require("../controllers/gateway.controllers");
const express = require('express');
const router = express.Router();
console.log('gateaway route');
router.post('/register', gateway_controllers_1.createUser);
router.post('/login', gateway_controllers_1.login);
router.post('/joinmatch', gateway_controllers_1.playMatch);
//router.get('/result', getResult)
module.exports = router;
//# sourceMappingURL=gateaway.routes.js.map