const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');
const nunjucks = require('nunjucks');
const MongoStore = require('connect-mongo');
const flash = require('flash')
const { isCelebrateError } = require('celebrate');

const logger = require('morgan');






//set dotenv
require('dotenv').config();

const mongoDBurl = process.env.MONGODB_URL;


//Allowing you to read JSON files.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('tiny'));

app.use(cookieParser());
app.use(
    session({
        secret: process.env.SECRET,
        store: MongoStore.create({mongoUrl: mongoDBurl}),
        name: 'sessionId',
        resave: false,
        saveUninitialized: true,
        cookie: {  maxAge : 7  *  24  *  60  *  60  *  1000 } 
    })
);

app.use(flash());

//router
const routes = require('./routes/router');
app.use('/space', routes);



//connecting with the bank
const conn = require('./db/conn');
conn();

app.use(express.static('public'));

app.use(morgan('combined'));

app.set('view engine', 'njk');

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

/*
app.set('views', path.resolve(__dirname, 'views'));
app.get('/', (req, res)=>{
    res.render('layout');
})
*/

//open route - public route
/*
app.use('/', (req, res, next)=>{
    res.send('see you space');
});
*/

const port = process.env.PORT || 3000


app.listen(port, ()=>{
    console.log('see you space...');
});