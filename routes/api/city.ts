var router = require('express').Router();
var mongoose = require('mongoose');
var City = mongoose.model('City');
var auth = require('../auth');

// var Person = mongoose.model('Person', yourSchema);

router.get('/city', auth.optional, function (req, res, next) {
    City.find({}, function (err, cities) {
        console.log(cities)
        var citiesMap = {};

        cities.forEach(function (city) {
            citiesMap[city._id] = city;
        });
        res.send(citiesMap);
    });
})

router.put('/city', auth.optional, function (req, res, next) {
    var newCity = new Monster(req.body.monster)
    newCity.save(function (err, results) {
        if (err) {
            res.send(err)
        }
        res.send(results)
    });
})

module.exports = router;