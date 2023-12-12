import { MongoClient } from 'mongodb';
const express = require('express');
const body = require('body-parser');

async function start() {
  try {

    const app = express();

    const mongo = await MongoClient.connect('mongodb+srv://Game_api:sI3vG3fOUjwDltxr@game.yik52gz.mongodb.net/Yu-gi-oh');

    await mongo.connect();

    app.db = mongo.db();

    // body parser

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