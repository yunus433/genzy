const User = require('../../../../models/user/User');

module.exports = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.redirect('/');

    return res.render('admin/users', {
      page: 'admin/users',
      title: 'Kullanıcılar',
      includes: {
        external: ['css', 'js', 'admin_general_css', 'fontawesome']
      },
      users
    });
  });
}
