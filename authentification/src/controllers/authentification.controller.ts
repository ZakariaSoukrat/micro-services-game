export {createUser ,login}
async function createUser(req: any, res: any) {
try {
const { db } = req.app;

const { username, email, pw} = req.body;

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


const regex = /\w+\@(.+)\.com/
const match = regex.exec(email);
if (!match){
return res.status(400).json({ message: 'email should be in the format : name@rule.com' });
}
if(match[1] == "player"){
const existingCustomer = await db.collection('player').findOne({
email: email.toLowerCase()
});

if (existingCustomer) {
return res.status(400).json({ message: 'player already exists' });
}
else{
const result = await db.collection('player').insertOne({
username : username,
email: email.toLowerCase(),
pw : pw,
requests : [],
coins : 0,
status : "offline",
creatures : [
	{ name: 'Utopia', attack: 10, defense: 4, stamina: 7, price: 10 },
	{
	name: 'Shadowstrike',
	attack: 11,
	defense: 3,
	stamina: 2,
	price: 7
	},
	{ name: 'Thunderclaw', attack: 10, defense: 4, stamina: 7, price: 8 },
	{ name: 'Blaze', attack: 20, defense: 4, stamina: 7, price: 20 },
	{ name: 'Gardien', attack: 10, defense: 4, stamina: 7, price: 10 },
	{ name: 'Serpent', attack: 10, defense: 4, stamina: 7, price: 8 }
	]
});

if (result.acknowledged) {
res.status(200).json({ message: 'Customer created' });
} else {
throw new Error('Customer not created');
}
}
}
if(match[1] == "admin"){
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
} else {
throw new Error('Customer not created');
}

}
if(match[1] == "reporter"){
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
} else {
throw new Error('Customer not created');
}

}}


catch(error) {
res.status(500).json({ error: error.toString() });
}
}


async function login(req: any, res: any) {
try {
const { db } = req.app;

const { email, pw} = req.body;

if (!email) {
return res.status(400).json({ message: 'Email is required' });
}

if (!pw) {
return res.status(400).json({ message: 'password is required' });
}



// check if customer exists
const regex = /\w+\@(.+)\.com/
const match = regex.exec(email);
if (!match){
return res.status(400).json({ message: 'email should be in the format : name@rule.com' });
}
if(match[1] == "player"){
const result = await db.collection('player').findOneAndUpdate({ email: email, pw : pw }, { $set: { status: "onLine" } });
if (result) {
req.session.email = email//

res.status(200).json({ message: 'player connected' });
} else {
throw new Error('player not found');
}

}
const result1 = await db.collection('admin').find().toArray();

if(match[1] == "admin"){
const result = await db.collection('admin').findOne({
email : email.toLowerCase(),
pw
});
if (result) {
req.session.email = email
res.status(200).json({ message: 'admin found' });
} else {
throw new Error('admin not found');
}

}
if(match[1] == "reporter"){
const result = await db.collection('reporter').findOne({
email : email.toLowerCase(),
pw
});
if (result) {
req.session.email = email
res.status(200).json({ message: 'reporter found' });
} else {
throw new Error('reporter not found');
}

}








}
catch(error) {
res.status(500).json({ error: error.toString() });
}
}