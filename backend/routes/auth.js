const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { OAuth2Client } = require('google-auth-library');

// signIn authentication
router.post('/', asyncHandler(async (req, res, next) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    const userData = { ..._.pick(user, ['username', 'isAdmin']), token: token};
    res.send(userData);  // in body
}))

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(req);
}

// signIn with google -> Verification on server side
router.post("/google", asyncHandler(async (req, res) => {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const { token }  = req.body;
    // Verification of tokenId, either it
    // - belongs to current application.
    // - Has it expired
    const ticket = await client.verifyIdToken({   
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    // metadata of user, to be saved in database
    const { name, email, picture } = ticket.getPayload();
    console.log(`User ${name} verified`);
    let user = await User.findOneAndUpdate({
        email
    }, {
        $set: {
            username: name,
            email: email,
            isAdmin: false,
        }
    }, {
        upsert: true
    })
    const jwtLoginToken = user.generateAuthToken();
    user = { ..._.pick(user, ['username', 'isAdmin']), token: jwtLoginToken};
    // res.status(200).cookie('login', jwtLoginToken, { expire: 360000 + Date.now() }).send(user);
    res.status(200).send(user);
}))

module.exports = router;