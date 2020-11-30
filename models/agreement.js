const mongoose = require('mongoose');
const { Schema } = mongoose;

const agreementSchema = new Schema({
  tenantLogin: { type: String, required: true },
  ownerLogin: { type: String, required: true },
  pathFile: { type: String, required: true },
});

module.exports = mongoose.model('Agreement', agreementSchema);
