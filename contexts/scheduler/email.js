var nodemailer = require('nodemailer');
const moment = require('moment');
const User = require('../users/model.js');
const Lead = require('../leads/model.js');
const Query = require('../queries/model.js');

////////////////////////////////
// Queries
////////////////////////////////
exports.task = (req, res) => {
  //get all users
  var userlist = User.find().then(users => {
    users.map(user => {
      Query.find({"user": user._id}).then(queries => {
        queries.map(query => {
          Lead.find({formId: query._id}).then(leads => {
            leads.map(lead => {
              //convert date times to unix epoch
              let createdAt = moment(lead.createdAt).unix()
              let now = moment().unix()
              //if number of seconds is less than 24 hours
              if(now - createdAt < 86400){
                console.log("NEW LEAD!")
                console.log(user.email)
                console.log(lead.submission)
                console.log(lead.contact)
              }
            })
          })
        })
      })
    })
  });
}
/*
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MG_USER, // generated ethereal user
            pass: process.env.MG_PASS // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"👻" <colt@bighatdigital.com>', // sender address
        to: 'colt, colt.sliva@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.redirect("/")
    });
});
*/
