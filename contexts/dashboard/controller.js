const Queries = require('../queries/model.js');
const Leads = require('../leads/model.js');
const User = require('../users/model.js');
const moment = require('moment')

exports.index = (req, res) => {
  Queries.
    find( {user: req.session.userId}, function (err, queries) {
      if (err) return handleError(err);
      if (queries.length === 0) return res.render('create', { authed: true, userId: req.session.userId });
      //map out unrelated user information

      return res.render('dashboard', {moment: moment, queries: queries, authed: true });
  });
}

exports.create = (req, res) => {
  return res.render('create', { authed: true, userId: req.session.userId });
}

exports.single = (req, res) => {
  Queries.
  findById(req.params.postId, function (err, query) {
    if (err) return handleError(err);
      //map out unrelated user information
      Leads.find({formId: query._id}, null, {sort: {createdAt: -1}}, function(err, leads){
        return res.render('dashboard-single', {moment: moment, query: query, leads: leads, authed: true });
      })
  } );
}

const json2csv = require('json2csv').parse;
const fields = ['submission', 'contact', 'ip'];
const opts = { fields };

exports.csv = (req, res) => {

  if (!req.session.userSubed){
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
