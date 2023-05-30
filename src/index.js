const express = require('express');
const router = express.Router();
const app = express();

//set dotenv
require('dotenv').config();

//router
const routes = require('./routes/router');
app.use('/', routes);

//Allowing you to read JSON files.
app.use(express.json());

//connecting with the bank
const conn = require('./db/conn');
conn();

app.use('/', (req, res, next)=>{
    res.send('see you space');
});

app.listen(process.env.PORT, ()=>{
    console.log('see you space...');
});