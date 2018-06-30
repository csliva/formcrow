const Queries = require('../queries/model.js');

exports.index = (req, res) => {
  Queries.
    find( {user: req.session.userId}, function (err, queries) {
      console.log(queries)
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
      return res.render('dashboard-single', { query: query, authed: true });
  } );
}
