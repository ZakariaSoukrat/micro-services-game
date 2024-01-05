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
  catch(error) {
    console.log(error);
  }
}

start();