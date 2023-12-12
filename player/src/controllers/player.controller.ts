import { Int32 } from "mongodb";

async function isAuthenticated(req, res) {
console.log(req.session);
console.log(req.session.email);
if (req.session && req.session.email) {
res.status(200).send('User is authenticated');

} else {
res.status(401).send('User is not authenticated');
}
}



async function getCoins(req, res){

const { db } = req.app;
if (req.session && req.session.email) {
const email = req.session.email
const existingPlayer = await db.collection('player').findOne({
email: email.toLowerCase()
});
return res.status(400).json({ Coins: existingPlayer.coins });

}
else (res.status(401).send('User is not authenticated'))
}

async function addCoins(req, res){
if (req.session && req.session.email) {
const { db } = req.app;
const email = req.session.email
const Player = await db.collection('player').findOne({
email: email.toLowerCase()
});
const prv_coins = parseInt(Player.coins,10);

const result = await db.collection('player').findOneAndUpdate({ email: email}, { $set: { coins: prv_coins+2 } });
res.status(200).json({ message: 'coins updated' });
}
else (res.status(401).send('User is not authenticated'))
}

async function getCreatures(req, res){

const { db } = req.app;
if (req.session && req.session.email) {
const email = req.session.email
const existingPlayer = await db.collection('player').findOne({
email: email.toLowerCase()
});
return res.status(400).json({ Creatures: existingPlayer.creatures });

}
else (res.status(401).send('User is not authenticated'))
}

export{isAuthenticated, getCoins, addCoins, getCreatures}