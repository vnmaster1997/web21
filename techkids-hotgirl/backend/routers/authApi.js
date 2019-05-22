const express = require('express');
const bcrypt = require('bcrypt');
const AuthApiRouter = express.Router();

const userModel = require('../models/user');

AuthApiRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    userModel.findOne({ username }, (err, user) => {
        if(err) console.log(err);
        else if(!user) res.json({ success: false, message: 'User not exist!'});
        else {
            if(bcrypt.compareSync(password, user.password)) {
                req.session.user = { username, id: user._id };
                res.json({ success: true, message: 'Login success!'})
            } else res.json({ success: false, message: 'Wrong password!'})
        }
    })
})

module.exports = AuthApiRouter;