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

    const mongo = await MongoClient.connect('mongodb+srv://newData:test123@cluster0.43miro1.mongodb.net/Yu-gi-oh');

    await mongo.connect();

    app.db = mongo.db();

    // body parser
    const store = new MongoDBStore({
      uri: 'mongodb+srv://newData:test123@cluster0.43miro1.mongodb.net',
      databaseName: 'Yu-gi-oh',
      collection: 'sessions',
    });

    store.on('error', (error) => {
      console.error(error);
    });

    // Session configuration
    app.use(session({
      secret: 'yourSecretKey',
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie: { secure: false } // Use true in production with HTTPS
    }));
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

    app.use('/authentification', require('./routes/authentification.router'));

    // Start server

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });

  }
  catch(error) {
    console.log(error);
  }
}

start();