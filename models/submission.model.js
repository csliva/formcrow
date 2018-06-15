const mongoose = require('mongoose');

const SubmissionSchema = mongoose.Schema({
    submission: String,
    contact: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Submission', SubmissionSchema);
