"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET;
async function createUser(req, res) {
    try {
        const { db } = req.app;
        const { username, email, pw } = req.body;
        if (!username) {
            return res.status(400).json({ message: 'username is required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!pw) {
            return res.status(400).json({ message: 'pw is required' });
        }
        // check if customer exists
        const regex = /\w+\@(.+)\.com/;
        const match = regex.exec(email);
        if (!match) {
            return res.status(400).json({ message: 'emai should be in the format : name@rule.com' });
        }
        if (match[1] == "player") {
            const existingCustomer = await db.collection('player').findOne({
                email: email.toLowerCase()
            });
            if (existingCustomer) {
                return res.status(400).json({ message: 'player already exists' });
            }
            const result = await db.collection('player').insertOne({
                username,
                email: email.toLowerCase(),
                pw
            });
            if (result.acknowledged) {
                res.status(200).json({ message: 'Customer created' });
            }
            else {
                throw new Error('Customer not created');
            }
        }
        if (match[1] == "admin") {
            const existingCustomer = await db.collection('admin').findOne({
                email: email.toLowerCase()
            });
            if (existingCustomer) {
                return res.status(400).json({ message: 'admin already exists' });
            }
            const result = await db.collection('admin').insertOne({
                username,
                email: email.toLowerCase(),
                pw
            });
            if (result.acknowledged) {
                res.status(200).json({ message: 'Customer created' });
            }
            else {
                throw new Error('Customer not created');
            }
        }
        if (match[1] == "reporter") {
            const existingCustomer = await db.collection('reporter').findOne({
                email: email.toLowerCase()
            });
            if (existingCustomer) {
                return res.status(400).json({ message: 'reporter already exists' });
            }
            const result = await db.collection('reporter').insertOne({
                username,
                email: email.toLowerCase(),
                pw
            });
            if (result.acknowledged) {
                res.status(200).json({ message: 'Customer created' });
            }
            else {
                throw new Error('Customer not created');
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
exports.createUser = createUser;
async function login(req, res) {
    try {
        const { db } = req.app;
        const { email, pw } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!pw) {
            return res.status(400).json({ message: 'password is required' });
        }
        // check if customer exists
        const regex = /\w+\@(.+)\.com/;
        const match = regex.exec(email);
        if (!match) {
            return res.status(400).json({ message: 'email should be in the format : name@rule.com' });
        }
        if (match[1] == "player") {
            const result = await db.collection('player').findOne({
                email: email.toLowerCase(),
                pw: pw
            });
            if (result) {
                // Perform localStorage action
                const token = jsonwebtoken_1.default.sign({ email: result.email }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                console.log(token);
                res.status(200).json({ message: 'player connected' });
            }
            else {
                throw new Error('player not found');
            }
        }
        const result1 = await db.collection('admin').find().toArray();
        console.log(result1);
        if (match[1] == "admin") {
            const result = await db.collection('admin').findOne({
                email: email.toLowerCase(),
                pw
            });
            if (result) {
                res.status(200).json({ message: 'admin found' });
            }
            else {
                throw new Error('admin not found');
            }
        }
        if (match[1] == "reporter") {
            const result = await db.collection('reporter').findOne({
                email: email.toLowerCase(),
                pw
            });
            if (result) {
                res.status(200).json({ message: 'reporter found' });
            }
            else {
                throw new Error('reporter not found');
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
exports.login = login;
//# sourceMappingURL=authentification.controller.js.map