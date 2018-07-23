const Lead = require('./model.js');
const Query = require('../queries/model.js');
const User = require('../users/model.js');
const axios = require('axios');

//1. Get related query and increment lead count
//2. Get related user to query
//3. Get Location from IP service or set to empty string
//4. Save lead

exports.create = (req, res) => {
  //1
  Query.findOne({_id :req.body.formId}).then(query => {
    //2
    User.findById(query.user).then(user => {
      if (user.subscribed || req.body.contact){
        var location = new Promise(function(resolve, reject) {
          if(user.subscribed){
            axios.get('https://ipinfo.io/'+ req.body.ip +'/geo?token=c22ea3559ce1aa').then(geo => {
              resolve(geo.data.city + ", " + geo.data.region);
            }).catch(error => reject(error));
          } else {
            resolve("")
          }
        });

      location.then(geo => {
        // Create a Submission
          const lead = new Lead({
            submission: req.body.submission,
            contact: req.body.contact,
            ip: req.body.ip,
            location: geo,
            formId: req.body.formId
          });

        // Save Submission in the database
        lead.save()
        .then(data => {
            Query.findOneAndUpdate({_id :req.body.formId}, {$inc : {'count' : 1}}).then(() => {
              res.send(data);
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Submission."
            });
        });
      })
    }
    })
  })
}
