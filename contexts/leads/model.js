const mongoose = require('mongoose');

const LeadSchema = mongoose.Schema({
    submission: String,
    contact: String,
    query: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Query' }]
}, {
    timestamps: true
});

exports.module = mongoose.model('Lead', LeadSchema);
