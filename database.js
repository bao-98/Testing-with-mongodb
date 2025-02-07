import { MongoClient, ServerApiVersion } from 'mongodb';
// Create a new client to manage connections with the database
// process.env.CONNECTION_STRING is an environment variable with your credentials, pulled from .env
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