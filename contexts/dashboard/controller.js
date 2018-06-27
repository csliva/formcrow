const Queries = require('../queries/model.js');

exports.index = (req, res) => {
  Queries.
    find( {user: req.session.userId} ).
    exec(function (err, queries) {
      if (err) return handleError(err);
      //map out unrelated user information
      return res.render('dashboard', { queries: queries, authed: true });
  });
}

exports.single = (req, res) => {
  Queries.
    find( {_id: req.params.postId} ).
    exec(function (err, query) {
      console.log(query)
      if (err) return handleError(err);
      //map out unrelated user information
      return res.render('dashboard-single', { query: query, authed: true });
  });
}
