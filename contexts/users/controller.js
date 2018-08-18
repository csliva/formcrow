const User = require('./model.js');
const bcrypt = require('bcrypt');
const randomBytes = require('randombytes');
const email = require('../scheduler/email.js');
const stripe = require('stripe')('pk_test_JfZU8rUoDEdZhGC6KxMONCQf');

//Need help??
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

// email
// password
// timestamp

///////////////////////////
// CREATE USER
///////////////////////////
exports.create = (req, res) => {
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
        subscribed: subscriber,
        mailto: req.body.email,
        partial: false,
        rate: "daily"
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

///////////////////////////
// AUTHENTICATE / LOGIN
///////////////////////////
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

///////////////////////////
//LOGOUT
///////////////////////////
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

///////////////////////////
// SETTINGS
///////////////////////////

// GET settings
exports.getSettings = (req, res) => {
  //ensure logged in
  if (req.session.userId){
    User.findById(req.session.userId).then(user => {
      let subscribed = user.subscribed
      return res.render('settings', { authed: true, user: user, subscribed: subscribed });
    })
  } else {
    return res.redirect('/');
  }
}

// POST settings
exports.setSettings = (req, res) => {
  //ensure logged in
  User.findById(req.session.userId).then(user => {
    //set user.partial to false if not set
    req.body.partial = req.body.partial ? true : false
    req.body.subscribed = req.body.subscribed ? true : false
    req.session.userSubbed = req.body.subscribed
    user.set({...req.body, ...user.rate, ...user.mailto, ...user.partial, ...user.subscribed})
    user.save(function (err, updatedUser) {
      if (err) return send("500 server error");
      req.session.flash = {"type": "success", "message": "Update Successful"}
      return res.redirect("/users/settings");
    });
  });
}

///////////////////////////
// FORGOT
///////////////////////////
//GET
exports.getForgot = (req, res) => {
  let authed = req.session.userId ? true : false
  let subscribed = req.session.userSubbed ? true : false
  return res.render('forgot', { authed: authed, subscribed: subscribed });
}
//POST
exports.postForgot = (req, res) => {
  try {
    User.findOne({email: req.body.email}).then(user => {
      if (user === null || user === undefined || user.length == 0) {
        //handle email not exisitng
        req.session.flash = {"type": "error", "message": "Woops, did you input the right email?"}
        return res.redirect("/users/forgot");
      } else {
        //success
        //generate token
        user.resetPasswordToken = randomBytes(20).toString('hex');;//get 16 random bytes
        //get date
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        //store new entries
        user.save().then(data => {
          let url = "formcrow.com/users/recover?token=" + data.resetPasswordToken
          email.sendRecovery(req.body.email, url);
          req.session.flash = {"type": "success", "message": "Check your email to reset your password"}
          return res.redirect("/users/forgot");
        })
        //email special recovery URL
        //create pages to handle URL -- either show expired or show form to confirm new password
      }
    })
  }
  catch(err){
    req.session.flash = {"type": "error", "message": "Failed email lookup"}
    return res.redirect("/users/forgot");
  }
}


///////////////////////////
// RECOVERY
///////////////////////////
//GET
exports.getRecover = (req, res) => {
    User.findOne({resetPasswordToken: req.query.token}).then(user => {
      let authed = req.session.userId ? true : false
      let subscribed = req.session.userSubbed ? true : false
      let expired = (Date.now() > user.resetPasswordExpires) ? true : false
      return res.render('recover', { authed: authed, subscribed: subscribed, expired: expired, user: user._id });

    })
}
//POST
exports.postRecover = (req, res) => {
  User.findById(req.query.id).then(user => {
    user.password = bcrypt.hashSync(req.body.password, 10)
    user.save(function (err, updatedUser) {
      if (err){
        req.session.flash = {"type": "error", "message": "Failed to updated user account"}
        return res.redirect('/')
      } else {
        req.session.flash = {"type": "success", "message": "Password Updated!"}
        return res.redirect('/')
      }
    });
  })
}

exports.getUpgrade = (req, res) => {
  let authed = req.session.userId ? true : false
  let subscribed = req.session.userSubbed ? true : false
  if (!authed){ return res.redirect("/") }
  if (subscribed) {return res.redirect("/dashboard")}
  return res.render('upgrade', { authed: authed, subscribed: subscribed });
}

exports.postUpgrade = (req, res) => {
  //get the user
  User.findById(req.query.id).then(user => {
    console.log(user.customerObject)
    res.send(req.body.stripeToken)
  })
}
