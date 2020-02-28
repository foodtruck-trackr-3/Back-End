const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    if(user.username && user.password) {
        Users.add(user)
            .then(saved => {
                res.status(201).json(saved);
            })
            .catch(err => {
                res.status(500).json({message: "Could not add user"});
            })
    } else {
        res.status(500).json({message: "Please provide a username and password"});
    };
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = createToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect username and/or password"
                });
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

function createToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
        roles: user.role
    }

    const options = {
        expiresIn: "1h"
    }

    const token = jwt.sign(payload, secret.jwtSecret, options);

    return token;
}

module.exports = router;