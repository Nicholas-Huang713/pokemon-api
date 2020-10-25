const express = require('express');
const router = express.Router();
const User = require('../models/user');


//REGISTER
router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({email: req.body.email}); 
    if(emailExist) return res.status(400).json('Email already exists');
    const user = new User({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email, 
        password: req.body.password
    });
    try{
        await user.save();
        res.send("Success!");
    } catch(err){
        res.status(400).send(err);
    }   
});

//LOGIN
router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');
    const validPass = await User.findOne({password: req.body.password});
    if(!validPass) return res.status(400).send('Invalid password');
    res.json(user);
});

module.exports = router;