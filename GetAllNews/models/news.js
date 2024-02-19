const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: String,
    summary: String,
    article: String,
    image: String,
    author: String,
    date: Date,
    category: String,

});

const News = mongoose.model('News', newsSchema);

module.exports = News;