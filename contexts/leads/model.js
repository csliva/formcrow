const mongoose = require('mongoose');

const LeadSchema = mongoose.Schema({
    submission: String,
    contact: String,
    ip: String,
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Query', index: true }
  }, {
    timestamps: true
});

module.exports = mongoose.model('Lead', LeadSchema);
