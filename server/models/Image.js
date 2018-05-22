const mongoose = require('mongoose');

const ImageShcema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
}, { timestamps: true });

mongoose.model('Image', ImageShcema);
