"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express = require('express');
const body = require('body-parser');
async function start() {
    try {
        const app = express();
        const mongo = await mongodb_1.MongoClient.connect('mongodb+srv://Game_api:sI3vG3fOUjwDltxr@game.yik52gz.mongodb.net/Yu-gi-oh');
        await mongo.connect();
        app.db = mongo.db();
        // body parser
        app.use(body.json({
            limit: '500kb'
        }));
        // Routes
        app.use('/authentification', require('./routes/authentification.router'));
        // Start server
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
//# sourceMappingURL=index.js.map