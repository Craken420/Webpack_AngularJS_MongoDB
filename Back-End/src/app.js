const express = require('express'),
      cors = require('cors'),
      morgan = require('morgan')

const errorHandler = require('./helpers/error-handler')
require('./db/db')

const app = express()

const port = process.env.DEV_PORT

app.set('PORT', process.env.PORT || port)

// Middleware
app.use( morgan('dev') )
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )
app.use( cors() )
app.use( errorHandler )

app.get( '/', (req, res) => res.send('Home') )
app.get( '/users', (req, res) => res.json([
    {name: 'Lol', email: 'lol@hotmail.com'},
    {name: 'Free', email: 'Free@hotmail.com'},
    {name: 'Fire', email: 'Fire@hotmail.com'},
    {name: 'Judge', email: 'Judge@hotmail.com'},
    {name: 'Pitbull', email: 'Pitbull@hotmail.com'}
]));

module.exports = app