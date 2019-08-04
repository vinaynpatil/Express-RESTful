const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

if (process.env.ENV === 'Test') {
  console.log("This is a test");
  const db = mongoose.connect('mongodb://localhost/bookAPI_test');
}
else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}
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

// Return the server thats listening
app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});


module.exports = app;