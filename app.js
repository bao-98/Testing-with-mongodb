import express from 'express';
import {client, connection} from './database.js';

const app = express();

let server;
connection.then(()=>{
  console.log("Successful connection to database!");
  server = app.listen(3000, ()=>console.log('Server listening.'));
})
.catch(e=>console.error(e));

// Create Database
const database = client.db('our-first-database');

app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res)=>{
    res.send(`Hello!`);
});

process.on('SIGINT', ()=>{
    client.close();
    console.log("closed database connection"); 
    process.exit(1);
});
