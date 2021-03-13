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

module.exports = app