const mongoose = require('mongoose');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.payment_number)
    return res.redirect('/profile');

  User.findOne({
    payment_number: req.body.payment_number
  }, (err, user) => {
    if (err) return res.redirect('/profile');

    if (user) {
      req.session.payment_error = res.__('Bu Papara numarası zaten kayıtlı, lütfen başka bir numara deneyin');
      return res.redirect('/profile');
    }

    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
      payment_number: req.body.payment_number
    }}, {new: true}, (err, user) => {
      if (err || !user) return res.redirect('/profile');

      req.session.user = user;
      return res.redirect('/profile');
    });
  });
}
