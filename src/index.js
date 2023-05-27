const express = require('express');
const router = express.Router();
const app = express();

//router
const routes = require('./routes/router');
app.use('/', routes);

//Allowing you to read JSON files.
app.use(express.json());

app.use('/', (req, res, next)=>{
    res.send('see you space');
});

app.listen(3000, ()=>{
    console.log('see you space...');
});