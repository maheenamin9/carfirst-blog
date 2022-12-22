const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const nodemailer = require('nodemailer');

// register a user
router.post('/', asyncHandler(async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already registered");

    user = new User(req.body, ['username', 'email', 'password', 'isAdmin']);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    const userData = { ..._.pick(user, ['username', 'isAdmin']), token: token};
    res.send(userData);
    // res.header('x-auth-token', token).send(_.pick(user, ['username', 'email']));
}));

// getting the current user
router.get('/me', auth, asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}));

// forgot password
router.post('/forgotPassword', asyncHandler(async(req, res) => {
    const { error } = validateEmail(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send("User not registered. Please try again or register for a new account");

    const secret = process.env.SECRET_KEY + user.password;
    let token = jwt.sign({email: user.email, _id: user._id}, secret, {expiresIn: "20m"});
    
    // converting token to base64
    token = Buffer.from(token).toString('base64');
    const passwordResetLink = `http://localhost:5173/resetPassword/${user._id}/${token}`;
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
    });
      
    var mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: user.email,
        subject: 'Password Reset',
        text: passwordResetLink
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
    res.send("updated");
}));

// reset password
router.post('/resetPassword/:id/:token', asyncHandler(async(req, res) => {
    const { id } = req.params;
    let { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({_id: id});
    if(!user) return res.status(404).send("User not exists");

    const secret = process.env.SECRET_KEY + user.password;
    try {
        // verified
        token = Buffer.from(token, 'base64').toString('ascii');  // decodding
        const decoded = jwt.verify(token, secret);
        const salt = await bcrypt.genSalt(10);
        encryptedPassword = await bcrypt.hash(password, salt);
        await User.updateOne({_id: id}, {
            $set: {
                password: encryptedPassword
            }
        });
        // res.render("index", {email: decoded.email, status: "verified"});

    } catch (error) {
        // not verified
        res.send(error.message);
    }
}));

function validateEmail(email) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    })
    return schema.validate(email);
}

router.get("/logOut", asyncHandler(async(req, res) => {
    // clearing the login cookie
    res.clearCookie('login').send({
        'success': true
    })
}))

module.exports = router;


// reset password
// router.get('/resetPassword/:id/:token', asyncHandler(async(req, res) => {
//     const {id, token} = req.params;

//     const user = await User.findOne({_id: id});
//     if(!user) return res.status(404).send("User not exists");

//     const secret = process.env.SECRET_KEY + user.password;
//     try {
//         // verified
//         const decoded = jwt.verify(token, secret);
//         res.render("index", {email: decoded.email, status: "not verified"});

//     } catch (error) {
//         // not verified
//         res.send(error.message);
//     }
// }));