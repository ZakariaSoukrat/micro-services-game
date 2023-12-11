"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentification_controller_1 = require("../controllers/authentification.controller");
const express = require('express');
const router = express.Router();
console.log('customers route');
router.post('/authentification', authentification_controller_1.createCustomerController);
module.exports = router;
//# sourceMappingURL=authentification.router.js.map