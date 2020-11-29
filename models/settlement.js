const mongoose = require('mongoose');
const { Schema } = mongoose;

const settlementSchema = new Schema({
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  tenantLogin: { type: String, required: true },
  ownerLogin: { type: String, required: true },
});

module.exports = mongoose.model('Settlement', settlementSchema);
