// require express
const express = require('express')
// set app equal to the execution of express
const app = express()
// we need bodyparser to extract data from the client
const bodyParser = require('body-parser')
// we need a view engine to render template to the client
const { engine } = require('express-handlebars')
// we need a port for our server to listen to
const PORT = 1337
// here I specify my templating logic and view engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
// here I use bodyparser to extract the data from the client
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// this is the home route
app.get('/', function(req, res, next) {
  res.render('home')
})
// this is the about route
app.get('/about', function(req, res, next) {
  res.render('about')
})
// this function inits my server to listen to: localhost:PORT 
app.listen(PORT, () => {
  console.log('App is listening to port', PORT)
})