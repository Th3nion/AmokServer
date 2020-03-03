let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let slug = require('slug');

// Schema is the description of the model, we registered it in mongoose
// With mongoose-unique-validator we can set some properties required and/or unique. awesome !
let citySchema = mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: String,
    image: String,
    backgroundImage: String,
    music: String,
    buildings: [String],
    ennemies: [String],
    rewards: [String]
});

// Slug transform url to avoid specials characters
citySchema.pre('validate', function (next: any) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

// method called above
citySchema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

citySchema.methods.toJSON = function () {
    return {
        slug: this.slug,
        name: this.name,
        description: this.description,
        image: this.image,
        backgroundImage: this.backgroundImage,
        music: this.music,
        buildings: this.buildings,
        ennemies: this.ennemies,
        rewards: this.rewards
    };
};

let City = mongoose.model('City', citySchema);