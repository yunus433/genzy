const mongoose = require('mongoose');

const User = require('../../../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err) return res.redirect('/admin');

    return res.render('admin/users/details', {
      page: 'admin/users/details',
      title: user.name,
      includes: {
        external: ['css', 'admin_general_css', 'fontawesome']
      },
      user
    });
  });
}
