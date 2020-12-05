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
var petProfileRoute = require('./routes/petProfileRoute');
var dogforadoptionRoute = require('./routes/dogforadoptionRoute');
var adoptionRoute = require('./routes/adoptionRoute');
var matchedusersRoute = require('./routes/matchedusersRoute');
var adoptionprofileRoute = require('./routes/adoptionprofileRoute');
var viewprofileRoute = require('./routes/viewprofileRoute');
var adminRoute = require('./routes/adminRoute');

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

app.use('/profile', middleware.checkToken, profileRoute); 

app.use('/dogforadoption', dogforadoptionRoute);

app.use('/adoption', adoptionRoute);

app.use('/matchedusers', matchedusersRoute);

app.use('/adoptionprofile', adoptionprofileRoute);

// use middleware checktoken for protected pages that require authentication from the user.

app.use('/petprofile', middleware.checkToken, petProfileRoute);

app.use('/viewprofile', middleware.checkToken, viewprofileRoute)

app.use('/admin', adminRoute);


//////////////////////////// temp
var cardFlipRoute = require('./routes/cardFlipRoute');
app.use('/cardflip', middleware.checkToken, cardFlipRoute);
///////////////////////////


app.listen(3000);  // app.listen(port, [host], [backlog], [callback]])
