const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const port = process.env.port || 1337;
require('dotenv').config();
const bodyParser = require('body-parser');
const User = require('./models/user');

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const connectDB = require('./config/db');
connectDB();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/aangemaakt', (req, res) => {
  res.render('aangemaakt');
});

app.get('/ingelogd', (req, res) => {
  res.render('ingelogd');
});

// registreren
app.post('/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await User.create({
      email: email,
      password: password,
    });
    return result, res.redirect('/login');
  } catch {
    console.log(
      'Niet gelukt om een account aan te maken, probeer het nog eens'
    );
    res.redirect('register');
  }
});

// inloggen
app.post('/login', async (req, res) => {
  try {
    const deGebruiker = await User.findOne({ email: req.body.email }).lean();
    const password = req.body.password;

    if (deGebruiker) {
      console.log(deGebruiker.password === password);
      if (deGebruiker.password === password) {
        // return deGebruiker
        res.redirect('/ingelogd');
        console.log('succesvol ingelogd');
      } else {
        // return 'invalid password'
        console.log('fout');
      }
    } else {
      // return 'user was not found'
      console.log('gebruiker niet gevonden');
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Server luistert op poort 8080
app.listen(port, () => {
  console.log('Server running on localhost:1337');
});