import {addCoins, getCoins, getCreatures, getPlayer, isAuthenticated,getPlayers} from "../controllers/player.controller";


const express = require('express');

const router = express.Router();

console.log('customers route');


router.get('/verify', isAuthenticated);
router.get('/coins', getCoins);
router.post('/add_coins', addCoins);
router.get('/creatures', getCreatures);
router.get('/player', getPlayer);
router.get('/players', getPlayers);




module.exports = router;