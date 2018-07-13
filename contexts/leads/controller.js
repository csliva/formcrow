const Lead = require('./model.js');
const Query = require('../queries/model.js');

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
      const lead = new Lead({
        submission: req.body.submission,
        contact: req.body.contact,
        ip: req.body.ip,
        formId: req.body.formId
      });

    //Add a new number to leadcount
    Query.findOneAndUpdate({_id :req.body.formId}, {$inc : {'count' : 1}}).exec();

    // Save Submission in the database
    lead.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
      console.log("5")
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Submission."
        });
    });
};
