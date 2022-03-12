// require express
const express = require('express')
// set app equal to the execution of express
const app = express()
// we need bodyparser to extract data from the client
const bodyParser = require('body-parser')

const slug = require('slug')
const multer = require('multer')
// require('dotenv').config()

const { MongoClient } = require("mongodb");
require("dotenv").config();
let database = null;

// we need a view engine to render template to the client
const { engine } = require('express-handlebars')
// we need a port for our server to listen to
const PORT = process.env.PORT || 1337
// here I specify my templating logic and view engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
// here I use bodyparser to extract the data from the client
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))
// this is the home route
app.get('/', async function(req, res, next) {
  let user = await database
    .collection("users")
    .findOne({ name: "Dennis" });
  console.log(user)
  res.render('home')
})

// this is the login route
app.get('/login', function(req, res, next) {
  res.render('login')
})

// this is the register route
app.get('/register', function(req, res, next) {
  res.render('register')
})

// app.post('/getData', )

// this function inits my server to listen to: localhost:PORT 
app.listen(PORT, () => {
  console.log('App is listening to port', PORT)
  connectDB().then(() => {
    console.log("Connected to MongoDB");
  });
})

async function connectDB() {

  // Connection URL from .env file

  const client = new MongoClient(process.env.DB_URL, {

    retryWrites: true,

    useUnifiedTopology: true,

    useNewUrlParser: true,

  });

  try {

    await client.connect(); // Connect the client

    database = client.db(process.env.DB_NAME); // Get the database from the client

  } catch (error) {

    console.log(error);

  }

}

// app.post('/register', function(req, res, next) {

// }