let router = require('express').Router();
let mongoose = require('mongoose');
let City = mongoose.model('City');
let auth = require('../auth');

router.get('/city', auth.optional, function (req, res, next) {
    City.find({}, function (err, cities) {
        console.log(cities)
        let citiesMap = {};

        cities.forEach(function (city) {
            citiesMap[city._id] = city;
        });
        res.send(citiesMap);
    });
})

router.put('/city', auth.optional, function (req, res, next) {
    let newCity = new Monster(req.body.monster)
    newCity.save(function (err, results) {
        if (err) {
            res.send(err)
        }
        res.send(results)
    });
})

module.exports = router;