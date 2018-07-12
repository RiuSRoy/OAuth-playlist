var jwt = require('jsonwebtoken');
var keys = require('./config/keys');

exports.getToken = (user) => {
    return jwt.sign(user , keys.SECRET_KEY, {expiresIn : 3600});
}

