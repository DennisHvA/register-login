const camelcase = require("camelcase");
console.log(camelcase("foo_bar_oof_rab"))
console.log('test test test')

const express = require('express')
const app = express()
const port = process.env.PORT || 1337

app.get('/', (req, res) => {
    res.send('test')
}

app.get('/about', (req, res) => {
    res.send('Dennis')
}

app.get('/contact', (req, res) => {
    res.send('Maartensdijk')
}

app.get('*', (req, res) => {
    res.render('not found...')
}

app.listen.PORT, () => {
    console.log('test: ${PORT}')
}
