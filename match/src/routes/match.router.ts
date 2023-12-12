import { playMatch, getAllMatches,getLastMatches } from "../controllers/match.controller";


const express  = require('express');

const router = express.Router();

console.log('customers route');


router.post('/playMatch', playMatch);
router.get('/getAllResults', getAllMatches);
router.get('/getResults', getLastMatches);




module.exports = router;