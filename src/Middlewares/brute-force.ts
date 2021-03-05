import * as ExpressBrute from 'express-brute';
import * as MongoStore from 'express-brute-mongo';
import { MongoClient } from 'mongodb';
import Configs from '../core/enivronment.config';

const store = new MongoStore((ready) => {
  MongoClient.connect(Configs().DB_CONNECTION_STRING, (err, db) => {
    if (err) throw err;
    ready(db.db('auth-service').collection('bruteforce-store'));
  });
});

const bruteforce = new ExpressBrute(store, {
  freeRetries: 3,
  handleStoreError: (payload) => {
    console.log(payload);
  },
});

export default bruteforce;
