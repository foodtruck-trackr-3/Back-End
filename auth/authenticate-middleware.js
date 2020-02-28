const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, dToken) => {
            if (err) {
                res.status(401).json(err);
            } else {
                req.dJwt = dToken;
                next();
            }
        })
    } else {
        res.status(401).json({message: "Access denied"});
    }
};