const express = require('express');
const bcrypt = require('bcrypt');
const AuthApiRouter = express.Router();

const userModel = require('../models/user');

AuthApiRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // promise
    // userModel.findOne({username})
    //     .then(user => {
    //         if(!user) {
    //             res.json({success: 'false', message: 'user Not Exist'})
    //         }
    //         if(bcrypt.compareSync(password, user.password)) {
    //             req.session.user = { username, id: user._id};
    //             res.json({success: 'true', message: 'Login Success', user})
    //         }
    //     })
    //     .catch(err => {
    //         res.json({success: 'false', message: 'Wrong Password'})
    //     })

    try {
        const user = await userModel.findOne({username});
        try {
            if(bcrypt.compareSync(password, user.password)) {
                req.session.user = {username, id: user._id}
                res.json({success: 'true', message: 'Login success', user})
            }
        } catch(err) {
            res.send({success: 'false', message: 'user Not Found'})
        }
    } catch(err) {
        res.send({success: 'false', err});
    }

    // userModel.findOne({ username }, (err, user) => {
    //     if(err) console.log(err);
    //     else if(!user) res.json({ success: false, message: 'User not exist!'});
    //     else {
    //         if(bcrypt.compareSync(password, user.password)) {
    //             req.session.user = { username, id: user._id };
    //             res.json({ success: true, message: 'Login success!', user})
    //         } else res.json({ success: false, message: 'Wrong password!'})
    //     }
    // })
})

AuthApiRouter.get('/', async (req, res) => {
    
    // async 
    try {
        res.json({success: 'true', message: 'Success', user: req.session.user})
    } catch(err) {
        res.json({success: 'false', message: 'Failed!'})
    }
    // if(req.session.user) {
    //     res.json({success: true, message: "Success", user: req.session.user });
    // } else {
    //     res.json({success: false, message: "Fail!"});
    // }
})


module.exports = AuthApiRouter;