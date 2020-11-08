const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config.js');



let middleware = require('./middleware.js');
var app = express();

var indexRoute = require('./routes/indexRoute');
var registerRoute = require('./routes/registerRoute');
var profileRoute = require('./routes/profileRoute');

app.use(express.json());
app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next(); 
});
app.use('/', indexRoute);

app.use('/register', registerRoute);
//app.use('/profile', profileRoute);

class AuthHandler {
    login (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // TODO: Get user infromation from database
        let testName = 'hi';
        let testPw = 'bye'
        //--------------------------------------
        
        if (username && password) {
            if (username === testName && password === testPw) {
                console.log("Test login success!")
                let token = jwt.sign({username: username},
                    config.secret, {
                        expiresIn: '1h'
                    }
                );
                res.json({
                    success: true,
                    message: 'Authentication Success',
                    token: token
                });
            }
            else {
                res.sendStatus(403).json({
                    success: false,
                    message: 'Incorrect Login Username or Password.'
                });
            }
        }
        else {
            res.sendStatus(400).json({
                success: false,
                message: 'Authentication Failed - Incorrect Request'
            })
        }
    }

    index(req, res) {
        res.json({
            success:true,
            message: 'Index page'
        });
    }

}


let handler = new AuthHandler();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.post('/login', handler.login);
app.get('/chktoken', middleware.checkToken, handler.index);

app.listen(3000);  // app.listen(port, [host], [backlog], [callback]])
