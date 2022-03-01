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

app.listen(PORT, () => {
  console.log('App is listening to port', PORT)
})