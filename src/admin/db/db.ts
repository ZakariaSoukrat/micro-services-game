import { MongoClient, Db } from 'mongodb';

let db: Db;

export const connectToDatabase = async (url: string, dbName: string) => {
  const connectionString = `${url}/${dbName}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
  const client = await MongoClient.connect(connectionString);
  db = client.db(dbName);
};

export const getDb = () => {
  if (!db) {
    throw new Error('Database not connected!');
  }
  return db;
};


