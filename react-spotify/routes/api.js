const express = require('express');
const router = express.Router();
const path = require( 'path' );
const url = require('url');
const User = require('../models/user');

router.get('/', (req, res) => {
    User.find({})
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        console.log("Error: " + err)
    })
})

module.exports = router;