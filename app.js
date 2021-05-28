const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.urlencoded({ extended: false }))

require('dotenv').config()
mongoose.connect(process.env.DB, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});
const authRoutes = require('./routes/AuthRoutes');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {
      title: 'Home'
  });
})

app.use('', authRoutes);

app.listen(process.env.PORT);