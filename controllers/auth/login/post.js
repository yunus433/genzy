const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.email || !req.body.password)
    return res.redirect('/');

  User.findUser(req.body.email.trim(), req.body.password, (err, user) => {
    if (err || !user)
      return res.redirect('/auth/login');

    req.session.user = user;

    if (req.session.redirect)
      return res.redirect(req.session.redirect);
    else if (user.completed)
      return res.redirect('/campaigns');
    else
      return res.redirect('/auth/complete');
  });
}
