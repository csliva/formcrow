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
    find( {_id: req.params.postID} ).
    exec(function (err, query) {
      if (err) return handleError(err);
      //map out unrelated user information
      console.log(query);
      return res.render('dashboard-single', { query: query, authed: true });
  });
}
