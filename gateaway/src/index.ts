import { MongoClient } from 'mongodb';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import bodyParser from 'body-parser';

const MongoDBStore = connectMongoDBSession(session);
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
app.db.collection('player').findOneAndUpdate({ email: req.session.email}, { $set: { status: "offline" } });
req.session.destroy(err => {
if (err) {
return res.status(500).send('Could not log out');
}
res.send('Logout successful');
})
});
// Routes

app.use('/gateaway', require('./routes/gateaway.router'));

// Start server

app.listen(3010, () => {
console.log('Server is running on port 3010');
});

}
catch(error) {
console.log(error);
}
}

start();