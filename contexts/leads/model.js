const mongoose = require('mongoose');

const LeadSchema = mongoose.Schema({
    submission: String,
    contact: String,
    ip: String
    //query: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Query' }]
  }, {
    timestamps: true
});

module.exports = mongoose.model('Lead', LeadSchema);
