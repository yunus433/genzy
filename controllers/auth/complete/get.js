const mongoose = require('mongoose');

const User = require("../../../models/user/User");

module.exports = (req, res) => {
  let error = null;

  if (req.session && req.session.error) {
    error = req.session.error;
    req.session.error = null;
  }

  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/');

    if (user.completed)
      return res.redirect('/campaigns');

    return res.render('auth/complete', {
      page: 'auth/complete',
      title: 'Hesabını Tamamla',
      includes: {
        external: ['css']
      },
      error
    });
  });
}
