const mongoose = require('mongoose');
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  roomId: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Favourite', favouriteSchema);
