"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentification_controller_1 = require("../controllers/authentification.controller");
const express = require('express');
const router = express.Router();
console.log('customers route');
router.post('/createUser', authentification_controller_1.createUser);
router.post('/login', authentification_controller_1.login);
module.exports = router;
//# sourceMappingURL=authentification.router.js.map