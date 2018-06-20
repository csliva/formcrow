const Queries = require('../queries/model.js');

exports.load = (req, res) => {
  Queries.
    find( {user: req.session.userId} ).
    exec(function (err, queries) {
      if (err) return handleError(err);
      //map out unrelated user information
      return res.render('dashboard', { queries: queries, authed: true });
  });
}
