const User = require('./model.js');
const bcrypt = require('bcrypt');

//Need help??
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

// email
// password
// timestamp

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }

    // Create a User
      const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      });

    // Save User in the database
    user.save()
    .then(data => {
      //store new session and send to dashboard
      req.session.userId = user._id
      return res.redirect('/dashboard');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Authenticate password
exports.authenticate = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.body.email
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
          return res.status(401).send({
            message: 'Incorrect Password'
          });
        }
        req.session.userId = user._id
        return res.redirect('/dashboard');

    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.body.email
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.body.email
        });
    });
};
