const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  sex: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

module.exports = mongoose.model('News', newsSchema);
