const express = require('express');
const app = express();

// MIDDLEWARES 
app.use(express.json())

// ROUTES
app.use('/', require('./routes/index.routes'))

module.exports = app