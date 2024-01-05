import { createUser, login, playMatch, showResult,showAllResult,getPlayers} from "../controllers/gateway.controllers";


const express = require('express');

const router = express.Router();

console.log('gateaway route');


router.post('/register', createUser);
router.post('/login', login);
router.post('/joinmatch', playMatch);
router.get('/result', showResult);
router.get('/Allresults', showAllResult);
router.get('/players', getPlayers);









module.exports = router;