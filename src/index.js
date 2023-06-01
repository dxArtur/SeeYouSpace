const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.use('/', (req, res, next)=>{
    res.send('see you space');
});

app.listen(process.env.PORT, ()=>{
    console.log('see you space...');
});