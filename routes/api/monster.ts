let router = require('express').Router();
let mongoose = require('mongoose');
let Monster = mongoose.model('Monster');
let auth = require('../auth');

router.get('/monster', auth.optional, function (req, res, next) {
    Monster.find({}, function (err, monsters) {
        console.log(monsters)
        let monstersMap = {};

        monsters.forEach(function (monster) {
            monstersMap[monster._id] = monster;
        });
        //res.send("AAA");
        res.send(monstersMap);
    });
})

router.put('/monster', auth.optional, function (req, res, next) {
    let newMonster = new Monster(req.body.monster)
    newMonster.save(function (err, results) {
        if (err) {
            res.send(err)
        }
        res.send(results)
    });
})

module.exports = router;