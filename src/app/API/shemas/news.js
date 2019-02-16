var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var News = new Schema({
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    content: String,
    publishedAt: {type: Date, default: Date.now}
  }
);

module.exports = mongoose.model('News', News);
