const express = require('express');
require('dotenv').config()

const mongoose = require('mongoose');
const app = express();


mongoose.connect(process.env.DB, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log('Error on start: ' + err.stack);
  });

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(process.env.PORT);