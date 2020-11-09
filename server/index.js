const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config.js');


let middleware = require('./middleware.js');
var app = express();

var indexRoute = require('./routes/indexRoute');
var registerRoute = require('./routes/registerRoute');
var profileRoute = require('./routes/profileRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next(); 
});
app.use('/', indexRoute);

app.use('/register', registerRoute);

app.use('/profile', profileRoute);


app.listen(3000);  // app.listen(port, [host], [backlog], [callback]])
