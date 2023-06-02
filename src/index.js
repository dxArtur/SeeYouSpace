const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');




//set dotenv
require('dotenv').config();

//Allowing you to read JSON files.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router
const routes = require('./routes/router');
app.use('/space', routes);



//connecting with the bank
const conn = require('./db/conn');
conn();

app.use(morgan('combined'));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.get('/landing', (req, res)=>{
    res.render('landingPage');
})

//open route - public route
app.use('/', (req, res, next)=>{
    res.send('see you space');
});


app.listen(3000, ()=>{
    console.log('see you space...');
});