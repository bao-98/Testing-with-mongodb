import express from "express"
const app = express();
let server;

import {client, connection} from "./database.js";

connection.then(()=>{
    console.log("Successful connection to database!");
    server = app.listen(3000, () =>console.log('Server listening.'));
})
.catch(e=>console.error(e));
const database = client.db('our-first-database');
process.on('SIGINT', ()=>{
    client.close();
    console.log("closed database connection");
    process.exit(1);
})