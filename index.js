// require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const slug = require('slug');
const multer = require('multer');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { engine } = require('express-handlebars');

// port
const PORT = process.env.PORT || 1337;

let database = null;

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.get('/', async (req, res, next) => {
  const user = await database.collection('users').findOne({ email: 'test' });
  console.log(user);
  res.render('home');
});

app.get('/login', (req, res, next) => {
  res.render('login');
});

app.get('/ingelogd', (req, res, next) => {
  res.render('ingelogd');
});

app.get('/register', (req, res, next) => {
  res.render('register');
});

app.get('/aangemaakt', (req, res, next) => {
  res.render('aangemaakt');
});

app.post("/aangemaakt", async (req, res) => {
  await database
    .collection("users")
    .insertOne({ email: req.body.email, password: req.body.password });

  let newUser = await database
    .collection("users")
    .findOne({ email: req.body.email });

  console.log(newUser); // Log the new user to the database

  res.redirect("/");
});

// database
async function connectDB() {
  const client = new MongoClient(process.env.DB_URL, {
    retryWrites: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  try {
    await client.connect();
    database = client.db(process.env.DB_NAME);
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, () => {
  console.log('App is listening to port', PORT);
  connectDB().then(() => {
    console.log('Connected to MongoDB');
  });
});
