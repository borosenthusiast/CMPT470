const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config.js');
let cookieParser = require('cookie-parser');


let middleware = require('./middleware.js');
var app = express();

var indexRoute = require('./routes/indexRoute');
var registerRoute = require('./routes/registerRoute');
var profileRoute = require('./routes/profileRoute');
var viewprofileRoute = require('./routes/viewprofileRoute');
var petProfileRoute = require('./routes/petProfileRoute');
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cookieParser());

app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next(); 
});
app.use('/', indexRoute);

app.use('/register', registerRoute);

app.use('/profile', profileRoute);

app.use('/petprofile', petProfileRoute);

app.use('/viewprofile', viewprofileRoute)


//////////////////////////// temp
var cardFlipRoute = require('./routes/cardFlipRoute');
app.use('/cardflip', middleware.checkToken, cardFlipRoute);
///////////////////////////


app.listen(3000);  // app.listen(port, [host], [backlog], [callback]])
