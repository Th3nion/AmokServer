var router = require('express').Router();
var mongoose = require('mongoose');
var Monster = mongoose.model('Monster');
var auth = require('../auth');

// var Person = mongoose.model('Person', yourSchema);

router.get('/monster', auth.optional, function(req, res, next) {
    // res.send("COUCOU");
    res.json(Monster.getAll)
})


module.exports = router;