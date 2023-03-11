const mongoose = require('mongoose');

const { Schema } = mongoose;

const PhotoModel = new Schema({
  path: {
    type: String,
    required: true
  },
  exif: {
    type: Object,
    required: true
  },
  datePhotographed: {
    type: Date
  },
  datePhotographedGrouping: { type: String }
});

module.exports = mongoose.model("photo", PhotoModel)