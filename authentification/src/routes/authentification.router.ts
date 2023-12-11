import { createCustomerController } from "../controllers/authentification.controller";


const express  = require('express');

const router = express.Router();

console.log('customers route');


router.post('/', createCustomerController);



module.exports = router;