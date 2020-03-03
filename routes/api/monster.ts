var router = require('express').Router();
var mongoose = require('mongoose');
var Monster = mongoose.model('Monster');
var auth = require('../auth');

router.get('/monster', auth.optional, function (req, res, next) {
    Monster.find({}, function (err, monsters) {
        console.log(monsters)
        var monstersMap = {};

        monsters.forEach(function (monster) {
            monstersMap[monster._id] = monster;
        });
        //res.send("AAA");
        res.send(monstersMap);
    });
})

router.put('/monster', auth.optional, function (req, res, next) {
    var newMonster = new Monster(req.body.monster)
    newMonster.save(function (err, results) {
        if (err) {
            res.send(err)
        }
        res.send(results)
    });
})

module.exports = router;