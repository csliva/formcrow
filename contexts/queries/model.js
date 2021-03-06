const mongoose = require('mongoose');

const QuerySchema = mongoose.Schema({
    query: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    color: String,
    count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Query', QuerySchema);
