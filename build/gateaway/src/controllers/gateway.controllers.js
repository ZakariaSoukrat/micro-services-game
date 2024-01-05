"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayers = exports.showAllResult = exports.playMatch = exports.showResult = exports.login = exports.createUser = void 0;
const axios_1 = __importDefault(require("axios"));
async function createUser(req, res) {
    try {
        const url = "http://localhost:3000/authentification/createUser"; // Replace with your endpoint URL
        const data = req.body; // Replace with your data
        axios_1.default.post(url, data).then((response) => {
            return response;
        })
            .catch((error) => {
            console.error('Error adding user:', error);
            return res.status(200).json({ message: 'Error adding the user' });
        });
        return res.status(200).json({ message: 'User added' });
    }
    catch (err) {
        return res.status(200).json({ message: 'User Already Exit' });
    }
}
exports.createUser = createUser;
async function login(req, res) {
    const url = "http://localhost:3000/authentification/login"; // Replace with your endpoint URL
    const data = req.body; // Replace with your data
    axios_1.default.post(url, data).then((response) => {
    })
        .catch((error) => {
        return res.status(400).json({ message: 'Error loging the user' });
    });
    return res.status(200).json({ message: 'User authentified' });
}
exports.login = login;
async function playMatch(req, res) {
    const url = "http://localhost:3005/match/playMatch"; // Replace with your endpoint URL
    const data = req.body; // Replace with your data
    axios_1.default.post(url, data).then((response) => {
    })
        .catch((error) => {
        return res.status(400).json({ message: 'Error loging the user' });
    });
    return res.status(200).json({ message: 'Match played' });
}
exports.playMatch = playMatch;
async function showResult(req, res) {
    const respone = await axios_1.default.get("http://localhost:3005/match/getResults");
    console.log(respone.data);
    return res.status(200).json(respone.data);
}
exports.showResult = showResult;
async function showAllResult(req, res) {
    const respone = await axios_1.default.get("http://localhost:3005/match/getAllResults");
    console.log(respone.data);
    return res.status(200).json(respone.data);
}
exports.showAllResult = showAllResult;
async function getPlayers(req, res) {
    const respone = await axios_1.default.get("http://localhost:3001/player/players");
    console.log(respone.data);
    return res.status(200).json(respone.data);
}
exports.getPlayers = getPlayers;
//# sourceMappingURL=gateway.controllers.js.map