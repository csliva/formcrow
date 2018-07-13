const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, index: { unique: true } },
    password: String,
    subscribed: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
