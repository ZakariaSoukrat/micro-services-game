import {addCoins, getCoins, getCreatures, isAuthenticated} from "../controllers/player.controller";


const express = require('express');

const router = express.Router();

console.log('customers route');


router.get('/verify', isAuthenticated);
router.get('/coins', getCoins);
router.post('/add_coins', addCoins);
router.get('/creatures', getCreatures);



module.exports = router;