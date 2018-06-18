const Submission = require('./model.js');

//Need help??
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

// submission
// contact
// timestamp

// Create and Save a new Submission
exports.create = (req, res) => {
    // Validate request
    if(!req.body.submission) {
        return res.status(400).send({
            message: "Submission can not be empty"
        });
    }

    // Create a Submission
      const submission = new Submission({
        submission: req.body.submission,
        contact: req.body.contact
      });

    // Save Submission in the database
    submission.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Submission."
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Submission.findByIdAndRemove(req.body.submissionId)
    .then(submission => {
        if(!submission) {
            return res.status(404).send({
                message: "Submission not found with id " + req.body.submissionId
            });
        }
        res.send({message: "Submission deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Submission not found with id " + req.body.submissionId
            });
        }
        return res.status(500).send({
            message: "Could not delete submissions with id " + req.body.submissionId
        });
    });
};
