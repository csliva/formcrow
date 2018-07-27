///credentials -- using Mailgun for now
//var sender = 'smtps://colt%40bighatdigital.com'   // The emailto use in sending the email
//var password = ''  // left out for security


var nodemailer = require('nodemailer');
const moment = require('moment');
const User = require('../users/model.js');
const Lead = require('../leads/model.js');
const Query = require('../queries/model.js');
const Email = require('email-templates');
//used to compile template
const fs = require('fs');
const ejs = require('ejs');

////////////////////////////////
// Queries
////////////////////////////////
exports.daily = (req, res) => {
  //get all users
  var userlist = User.find({"rate": "daily"}).then(users => {
    //for each user
    users.map(user => {
      //get all queries
      Query.find({"user": user._id}).then(queries => {
        //for each query
        queries.map(query => {
          //get all leads
          Lead.find({formId: query._id}).then(leads => {
            //create an empty lead list. If lead needs to be emailed, push in
            let lead_list = []
            //for each lead
            leads.map(lead => {
              //convert date times to unix epoch
              let createdAt = moment(lead.createdAt).unix()
              let now = moment().unix()
              //if number of seconds is less than 24 hours
              if(now - createdAt < 86400){
                lead_list.push(lead)
              }
            })
            //send all leads created in last 24 hours
            if(lead_list.length > 0){ module.exports.sendMail(user.mailto, query.query, lead_list) }
          })
        })
      })
    })
  });
}



exports.hourly = (req, res) => {
  //get all users
  var userlist = User.find({"rate": "hourly"}).then(users => {
    //for each user
    users.map(user => {
      //get all queries
      Query.find({"user": user._id}).then(queries => {
        //for each query
        queries.map(query => {
          //get all leads
          Lead.find({formId: query._id}).then(leads => {
            //create an empty lead list. If lead needs to be emailed, push in
            let lead_list = []
            //for each lead
            leads.map(lead => {
              //convert date times to unix epoch
              let createdAt = moment(lead.createdAt).unix()
              let now = moment().unix()
              //if number of seconds is less than 24 hours
              if(now - createdAt < 3600){
                lead_list.push(lead)
              }
            })
            //send all leads created in last 24 hours
            if(lead_list.length > 0){ module.exports.sendMail(user.mailto, query.query, lead_list) }
          })
        })
      })
    })
  });
}

////////////////////////////
// Send mail function -- create transport and
////////////////////////////
//Expects user email and lead array
exports.sendMail = function(target_email, question, lead_list){
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.MG_USER, // generated ethereal user
          pass: process.env.MG_PASS // generated ethereal password
      }
  });


  var compiled = ejs.compile(fs.readFileSync(__dirname + '/html.ejs', 'utf8'));
  var html = compiled({leads: lead_list, moment: moment});

  let mailOptions = {
      from: '"💸" <colt@bighatdigital.com>', // sender address
      to: target_email, // list of receivers
      subject: question+' ✔', // Subject line
      text: 'It looks like you do not recieve html emails. Log into formcrow.com to see new leads.', // plain text body
      html: html // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
  });
}
