const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, index: { unique: true } },
    password: String,
    subscribed: Boolean,
    rate: String,
    mailto: String,
    partial: Boolean,
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

//rate options:
// [daily, hourly, single, none]
