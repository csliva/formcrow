const Queries = require('../queries/model.js');

exports.index = (req, res) => {
  Queries.
    find( {user: req.session.userId} ).
    exec(function (err, queries) {
      if (err) return handleError(err);
      if (queries.length == 0) return res.redirect('/dashboard/create');
      //map out unrelated user information
      return res.render('dashboard', { queries: queries, authed: true });
  });
}

exports.create = (req, res) => {
  return res.render('create', { authed: true });
}

exports.single = (req, res) => {
  Queries.
  findById(req.params.postId, function (err, query) {
    if (err) return handleError(err);
      //map out unrelated user information
      return res.render('dashboard-single', { query: query, authed: true });
  } );
}