"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const express = require('express');
const body = require('body-parser');
async function start() {
    try {
        const app = express();
        const mongo = await mongodb_1.MongoClient.connect('mongodb+srv://Game_api:sI3vG3fOUjwDltxr@game.yik52gz.mongodb.net/Yu-gi-oh');
        await mongo.connect();
        app.db = mongo.db();
        // Session configuration
        app.use(body.json({
            limit: '500kb'
        }));
        // Routes
        app.use('/match', require('./routes/match.router'));
        // Start server
        app.listen(3005, () => {
            console.log('Server is running on port 3005');
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
//# sourceMappingURL=index.js.map