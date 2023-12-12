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

    const mongo = await MongoClient.connect('mongodb+srv://Game_api:sI3vG3fOUjwDltxr@game.yik52gz.mongodb.net/Yu-gi-oh');

    await mongo.connect();

    app.db = mongo.db();

    // body parser
    const store = new MongoDBStore({
      uri: 'mongodb+srv://Game_api:sI3vG3fOUjwDltxr@game.yik52gz.mongodb.net',
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

    // Routes

    app.use('/player', require('./routes/player.router'));

    // Start server

    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });

  }
  catch(error) {
    console.log(error);
  }
}

start();