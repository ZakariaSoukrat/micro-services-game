import { playMatch, getMatches } from "../controllers/match.controller";


const express  = require('express');

const router = express.Router();

console.log('customers route');


router.post('/playMatch', playMatch);
router.get('/login', getMatches);



module.exports = router;