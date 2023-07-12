const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
require('dotenv').config();
const PORT = process.env.PORT || 1337;
const bodyParser = require('body-parser');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

// database
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
    console.log('made a account');
    return result, res.redirect('/login');
  } catch {
    console.log('failed to make a account');
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
        console.log('logged id');
      } else {
        // return 'invalid password'
        res.redirect('/login');
        console.log('wrong password');
      }
    } else {
      // return 'user was not found'
      console.log('user not found');
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    throw new Error('something went wrong ...');
  }
});

// port
app.listen(PORT, () => {
  console.log('Server running on localhost:1337');
});
