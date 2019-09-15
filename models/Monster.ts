var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

// Schema is the description of the model, we registered it in mongoose
// With mongoose-unique-validator we can set some properties required and/or unique. awesome !
var monsterSchema = mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: { type: String, required: true, unique: true },
  maxLife: Number,
  avatar: String,
  description: String
});

// Slug transform url to avoid specials characters
monsterSchema.pre('validate', function (next: any) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

// method called above
monsterSchema.methods.slugify = function () {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

monsterSchema.methods.toJSON = function () {
  return {
    slug: this.slug,
    name: this.name,
    maxLife: this.maxLife,
    avatar: this.avatar,
    description: this.description
  };
};



var Monster = mongoose.model('Monster', monsterSchema);