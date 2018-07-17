const User = require('./model.js');
const bcrypt = require('bcrypt');

//Need help??
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

// email
// password
// timestamp

// Create and Save a new User
exports.create = (req, res) => {
    console.log('--------------');
    console.log(req.body);
    console.log('--------------');
    // Validate request
    if(!req.body.email) {
        req.session.flash = {"type": "error", "message": "Please enter an email"}
        return res.redirect("/users/signup");
    }
    if(!req.body.password) {
      req.session.flash = {"type": "error", "message": "Please enter a password"}
      return res.redirect("/users/signup");
    }

    let subscriber = req.body.subscribed ? true : false

    // Create a User
      const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        subscribed: subscriber
      });

    // Save User in the database
    user.save()
    .then(data => {
      //store new session and send to dashboard
      req.session.userId = user._id
      req.session.userSubbed = user.subscribed
      req.session.flash = {"type": "success", "message": "Welcome to Form Crow! Thanks for signing up!"}
      return res.redirect("/dashboard");
    }).catch(err => {
      req.session.flash = {"type": "error", "message": "Something went awfully wrong signing up. Please reach out to us and let us know how we can help."}
      return res.redirect("/users/signup");
    });
};

// Authenticate password
exports.authenticate = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            req.session.flash = {"type": "error", "message": "Sorry, We couldn't find a user with the email " + req.body.email}
            return res.redirect("/users/login");
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
          req.session.flash = {"type": "error", "message": "Woops, incorrect password."}
          return res.redirect("/users/login");
        }
        req.session.userId = user._id
        req.session.userSubbed = user.subscribed
        return res.redirect('/dashboard');

    }).catch(err => {
        if(err.kind === 'ObjectId') {
          req.session.flash = {"type": "error", "message": "Sorry, We couldn't find a user with the email " + req.body.email}
          return res.redirect("/users/login");
        }
          req.session.flash = {"type": "error", "message": "Sorry, Error retrieving user with the email " + req.body.email}
          return res.redirect("/users/login");
    });
};

// GET /logout
exports.logout = (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}
