import { verifyPlayer } from "../controllers/player.controller";


const express  = require('express');

const router = express.Router();

console.log('player route');


router.post('/verify',verifyPlayer );



module.exports = router;