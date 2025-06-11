const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model('Service', serviceSchema);
