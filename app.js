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

// Application for storing abd retrieving different kinds of foods
// Seet up a form to allow user to input foods
app.get('/', (req,res)=>{
    res.send(`<h1>Hello Database!</h1>
      <form action="/foods" method="POST">
        <label>
          Please enter the name of the food: 
          <input type="text" name="nameOfFood">
        </label>
        <label>
          Rate this food between 0 and 5:  
          <input type="text" name="rating">
        </label>
        <button>Submit</button>
      </form>
      `);
});

// handle the form submission
app.post('/foods', (req, res) => {
  // Create a new Document using the form data and insert it in the database
  // Document is like an object that represents one "thing" that we store in the database.
  // Documents don't have as strict of a structure as relational databases
  let newFoodDocument = {
    name: req.body.nameOfFood,
    rating: Number(req.body.rating)
  }

  // Store this document in a collection
  // Might take time to insert the doc, but our program will not pause to wait.
  // We need to use ansycronous programming ideas to make sure things happen in the right order.
  // (Promises). Wait until we know the document was inserted THEN send a response to the client.  
  database.collection('foods').insertOne(newFoodDocument)
  .then(() => {
    //res.send("Success!");
    // Get all documents in the database and send them back to the client
    // Find returns a "cursor"
    return database.collection('foods').find({}).toArray() // This returns a promise that is handled by the "then" that appears below
  })
  .then(retrieveFoods => {
    res.json(retrieveFoods);
  })
  .catch(error => {
    res.send("Something went wrong!");
  })
});

// get food documents that have a particular rating
app.get('/foods/:rating', (req, res) => {
  database.collection("foods").find({rating:{$eq/*change this*/: Number(req.params.rating)}}).project({_id:0}).toArray()
  .then(result => {
    res.json(result);
  })
  .catch(eq => {
    res.send("error!");
  })
});
// CHALLENGE: Figure out how to modify the query above to find all documents with a rating the is LAGGER than the chosen rating
// SOLVED: change $eq into $gt

process.on('SIGINT', ()=>{
    client.close();
    console.log("closed database connection"); 
    process.exit(1);
});
