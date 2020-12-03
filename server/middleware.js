var jwt = require('jsonwebtoken');
const config = require('./config.js');
var User = require('./models/user.js')

const account_type = {
	ADMIN: 'Admin',
	ADOPT: 'Adopt',
	USER: 'User'
};

const getUser = async (id) => {
    user = await (User.getUserbyId(id));
    return user;
}

const checkToken = (req, res, next) => {
    let headers = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
    if (headers.startsWith('Bearer ')) {
        headers = headers.slice(7, headers.length);
    }
    console.log('tokencheck');
    if (typeof headers === "undefined") {
        return res.redirect('/');
    }
    console.log(headers);
    token = JSON.parse(headers).token;
    console.log(token);
    if (token && typeof token !== "undefined") {
        jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            console.log("err in token");
            return res.json({
            success: false,
            message: 'Token is not valid'
            });
        } else {
            req.decoded = decoded;
            console.log("decoded: " + JSON.stringify(decoded.id));
            let user = await getUser(decoded.id);
            console.log(user);
            req.uid = decoded.id;
            req.account_type = user.account_type;
            console.log("User matched from DB: " + JSON.stringify(user));
            await next();
        }
        });
    } else {
        console.log("No authentication token was provided.");
        return res.status(404).json({
        success: false,
        message: 'Auth token is not supplied'
        });
    }
}

module.exports = {
    checkToken: checkToken
}