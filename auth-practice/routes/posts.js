const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (req, res) => {
    res.send(req.user);
    User.findbyOne({_id: req.user});
});

module.exports = router;