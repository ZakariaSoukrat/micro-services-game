"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatches = exports.playMatch = void 0;
function createCreature(name, attack, defense, stamina, price) {
    return {
        name,
        attack,
        defense,
        stamina,
        price
    };
}
const Utopia = createCreature("Utopia", 10, 4, 7, 10);
const Shadowstrike = createCreature("Shadowstrike", 11, 3, 2, 7);
const Thunderclaw = createCreature("Thunderclaw", 10, 4, 7, 8);
const Blaze = createCreature("Blaze", 20, 4, 7, 20);
const Gardien = createCreature("Gardien", 10, 4, 7, 10);
const Serpent = createCreature("Serpent", 10, 4, 7, 8);
const ListCreatures = [Utopia, Shadowstrike, Thunderclaw, Blaze, Gardien, Serpent];
function calculateScore(creature) {
    return creature.attack ** 2 + creature.defense * creature.stamina;
}
function playRound(playerCreature, botCreatures) {
    let winningCreature = botCreatures[0]; // Assuming the first bot initially wins
    const playerScore = calculateScore(playerCreature);
    // Calculate scores for each bot and find the highest scoring bot
    let highestBotScore = calculateScore(botCreatures[0]);
    for (let i = 1; i < botCreatures.length; i++) {
        const botScore = calculateScore(botCreatures[i]);
        if (botScore > highestBotScore) {
            highestBotScore = botScore;
            winningCreature = botCreatures[i];
        }
    }
    // Compare player's score with the highest scoring bot
    if (playerScore > highestBotScore) {
        winningCreature = playerCreature;
    }
    return winningCreature;
}
function getRandomElement(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}
async function playMatch(req, res) {
    const { db } = req.app;
    const playerCreature = Utopia;
    var match = {};
    match['date'] = Date();
    const rounds = 5;
    let playerWins = 0;
    for (let i = 1; i <= rounds; i++) {
        const roundWinner = playRound(playerCreature, [getRandomElement(ListCreatures), getRandomElement(ListCreatures), getRandomElement(ListCreatures), getRandomElement(ListCreatures)]);
        let round = "round" + i;
        match[round] = {};
        if (roundWinner == playerCreature) {
            match[round]["winner"] = "playerName";
        }
        else {
            match[round]["winner"] = "Bots";
        }
        match[round]['Creature'] = roundWinner;
        // Check if the player won the round
        if (roundWinner === playerCreature) {
            playerWins++;
            addCoins();
        }
    }
    if (playerWins >= 3) {
        match["result"] = "Win";
    }
    else {
        match["result"] = "Lose";
    }
    const result = await db.collection('match').insertOne(match);
    if (result.acknowledged) {
        res.status(200).json({ message: 'match played' });
    }
    else {
        throw new Error('match not played');
    }
}
exports.playMatch = playMatch;
function addCoins() { }
async function getMatches(req, res) {
    const { db } = req.app;
    const result = await db.collection('match').find();
    return res.status(200).json(result);
}
exports.getMatches = getMatches;
//# sourceMappingURL=match.controller.js.map