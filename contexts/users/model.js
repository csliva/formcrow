const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, index: { unique: true } },
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
