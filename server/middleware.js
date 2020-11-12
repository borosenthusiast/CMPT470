var jwt = require('jsonwebtoken');
const config = require('./config.js');
var User = require('./models/user.js')

const account_type = {
	ADMIN: 'Admin',
	ADOPT: 'Adopt',
	USER: 'User'
};

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(8, token.length);
    }
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.json({
            success: false,
            message: 'Token is not valid'
            });
        } else {
            req.decoded = decoded;
            let user = await User.getUserbyUsername(username);
            req.account_type = user.account_type;
            console.log("User matched from DB: " + JSON.stringify(user));
            next();
        }
        });
    } else {
        return res.json({
        success: false,
        message: 'Auth token is not supplied'
        });
    }
}

module.exports = {
    checkToken: checkToken
}