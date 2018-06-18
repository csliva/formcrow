const Query = require('./model.js');

//Need help??
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

// query
// user
// timestamp

// Create and Save a new Query
exports.create = (req, res) => {
    // Validate request
    if(!req.body.query) {
        return res.status(400).send({
            message: "Submission can not be empty"
        });
    }

    // Create a Submission
    const query = new Query({
      query: req.body.query,
      user: req.session.userId
    });

    // Save Submission in the database
    query.save()
    .then(data => {
      return res.redirect('dashboard');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Submission."
        });
    });
};
