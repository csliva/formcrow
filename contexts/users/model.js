const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, index: { unique: true } },
    password: String,
    queries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Query' }]

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
