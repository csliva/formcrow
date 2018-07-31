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
// TRANSPORTER
////////////////////////////////
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MG_USER,
        pass: process.env.MG_PASS
    }
});

let from_email = '"💸 Form Crow" <colt@bighatdigital.com>'

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


  var compiled = ejs.compile(fs.readFileSync(__dirname + '/lead.ejs', 'utf8'));
  var html = compiled({leads: lead_list, moment: moment});

  let leadOptions = {
      from: from_email, // sender address
      to: target_email, // list of receivers
      subject: question+' ✔', // Subject line
      text: 'It looks like you do not recieve html emails. Log into formcrow.com to see new leads.', // plain text body
      html: html // html body
  };

  // send mail with defined transport object
  transporter.sendMail(leadOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
  });
}

exports.sendRecovery = function(target_email, recovery_url){
  var compiled = ejs.compile(fs.readFileSync(__dirname + '/recover.ejs', 'utf8'));
  var html = compiled({recovery: recovery_url});

  let recoveryOptions = {
    from: from_email,
    to: target_email,
    subject: "Form Crow Password Recovery",
    text: recovery_url,
    html: html
  };

  transporter.sendMail(recoveryOptions, (er, info) => {
    if (error) {
      return console.log(error);
    }
  })
}
