var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var monsterSchema = mongoose.Schema({
    name: String, 
    life: String,
    avatar: String,
    description: String   
  }); 
  
  var Monster = mongoose.model('Monster', monsterSchema);