"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const express = require('express');
const body = require('body-parser');
async function start() {
    try {
        const app = express();
        // body parser
        // Session configuration
        app.use(body.json({
            limit: '500kb'
        }));
        app.get('/logout', (req, res) => {
            app.db.collection('player').findOneAndUpdate({ email: req.session.email }, { $set: { status: "offline" } });
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).send('Could not log out');
                }
                res.send('Logout successful');
            });
        });
        // Routes
        app.use('/gateaway', require('./routes/gateaway.router'));
        // Start server
        app.listen(3010, () => {
            console.log('Server is running on port 3010');
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
//# sourceMappingURL=index.js.map