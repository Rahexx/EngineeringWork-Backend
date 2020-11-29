const mongoose = require('mongoose');
const { Schema } = mongoose;

const faultSchema = new Schema({
  roomId: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'W trakcie' },
});

module.exports = mongoose.model('Fault', faultSchema);
