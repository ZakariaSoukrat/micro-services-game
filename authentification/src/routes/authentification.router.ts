import { createUser, login } from "../controllers/authentification.controller";


const express  = require('express');

const router = express.Router();

console.log('customers route');


router.post('/createUser', createUser);
router.post('/login', login);



module.exports = router;