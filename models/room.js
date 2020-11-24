const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  pathImage: { type: String, required: true },
  location: { type: String, required: true },
  ownerId: { type: String, required: true },
  tenantId: { type: String, default: '' },
  isLandLord: { type: Boolean, default: false },
  dateAdd: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', roomSchema);
