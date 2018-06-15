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

// Retrieve and return all submissions from the database.
exports.findAll = (req, res) => {
    Submission.find()
    .then(submissions => {
        res.send(submissions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Submission."
        });
    });
};
