const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');

// Gets the port from the nodemon configuration from the package.json file
const port = process.env.PORT || 3000;
// This is a mongoose model
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Wiring up the api
app.use('/api', bookRouter);

// Everytime I get a get request to '/' I respond with a function
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
