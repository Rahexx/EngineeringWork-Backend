const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  idFrom: { type: String, required: true },
  idTo: { type: String, required: true },
  chat: { type: Array, default: [] },
});

module.exports = mongoose.model('Message', messageSchema);
