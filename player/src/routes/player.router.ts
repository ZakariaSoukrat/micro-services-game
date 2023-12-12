import {isAuthenticated} from "../controllers/player.controller";


const express  = require('express');

const router = express.Router();

console.log('customers route');


router.get('/verify', isAuthenticated);



module.exports = router;