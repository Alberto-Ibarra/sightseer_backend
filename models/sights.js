const mongoose = require('mongoose');

const sightSchema = new mongoose.Schema({
    country: String,
    description: String,
    season: String,
    image: String,
    rating: Number
},{timestamps:true});

const Sights = mongoose.model('Sight', sightSchema);

module.exports = Sights;