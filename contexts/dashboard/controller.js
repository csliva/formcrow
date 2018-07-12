const Queries = require('../queries/model.js');
const Leads = require('../leads/model.js');

exports.index = (req, res) => {
  Queries.
    find( {user: req.session.userId}, function (err, queries) {
      if (err) return handleError(err);
      if (queries.length === 0) return res.render('create', { authed: true, userId: req.session.userId });
      //map out unrelated user information
      
      return res.render('dashboard', { queries: queries, authed: true });
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
      Leads.find({formId: query._id}, function(err, leads){
        return res.render('dashboard-single', { query: query, leads: leads, authed: true });
      })
  } );
}

const json2csv = require('json2csv').parse;
const fields = ['submission', 'contact', 'ip'];
const opts = { fields };

exports.csv = (req, res) => {
  Queries.
  findById(req.params.postId, function (err, query) {
    if (err) return handleError(err);
      //map out unrelated user information
      Leads.find({formId: query._id}, function(err, leads){
        const csv = json2csv(leads, opts);
        return res.send(new Buffer(csv));
        // return res.render('dashboard-single', { query: query, leads: leads, authed: true });
      })
  } );
}
