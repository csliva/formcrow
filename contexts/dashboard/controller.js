const Queries = require('../queries/model.js');
const Leads = require('../leads/model.js');
const User = require('../users/model.js');
const moment = require('moment')

exports.index = (req, res) => {
  var subscribed = req.session.userSubbed ? true : false;
  Queries.
    find( {user: req.session.userId}, function (err, queries) {
      if (err) return handleError(err);
      if (queries.length === 0) return res.render('create', { authed: true, userId: req.session.userId, subscribed: subscribed });
      //map out unrelated user information

      return res.render('dashboard', {moment: moment, queries: queries, authed: true, subscribed: subscribed  });
  });
}

exports.create = (req, res) => {
  var subscribed = req.session.userSubbed ? true : false;
  return res.render('create', { authed: true, userId: req.session.userId, subscribed: subscribed });
}

exports.single = (req, res) => {
  var subscribed = req.session.userSubbed ? true : false;
  Queries.
  findById(req.params.postId).then(query => {
      Leads.find({formId: query._id}, null, {sort: {createdAt: -1}}, function(err, leads){
        return res.render('dashboard-single', {moment: moment, query: query, leads: leads, authed: true, subscribed: subscribed});
      })
  })
}

const json2csv = require('json2csv').parse;
const fields = ['submission', 'contact', 'location', 'createdAt'];
const opts = { fields };

exports.csv = (req, res) => {

  if (!req.session.userSubbed){
    req.session.flash = {"type": "error", "message": "This is a premium feature. Support form crow and get premium?"}
    return res.redirect(req.get('referer'));
  } else {
    Queries.
    findById(req.params.postId, function (err, query) {
      if (err) return handleError(err);
        // csv stuff
        Leads.find({formId: query._id}, function(err, leads){
          const csv = json2csv(leads, opts);
          var title = query.query.replace(/[^a-zA-Z0-9_-]/g,'_');
          res.attachment(title+'.csv');
          return res.send(new Buffer(csv));
          // return res.render('dashboard-single', { query: query, leads: leads, authed: true });
        })
    } );
  }

}
