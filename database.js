import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(process.env.CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// establish the connection
const connection = client.connect();

// export the connection and client for use in app.js
export {client, connection};