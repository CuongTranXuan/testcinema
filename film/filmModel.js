const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    adult: {type: Boolean},
    backdrop_path: {type: String},
    id: {type: String, unique:true, required:true},
    original_language: {type: String},
    original_title: {type: String},
    overview: {type: String},
    popularity: {type: Number},
    poster_path: {type: String},
    release_date: {type: String},
    title: {type: String},
    video: {type: String},
    vote_average: {type: Number},
    vote_count: {type: Number}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Film', schema);