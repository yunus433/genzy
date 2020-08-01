const mongoose = require('mongoose');

const User = require('../../../../models/user/User');
const Payment = require('../../../../models/payment/Payment');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.query.user_id || !req.query.amount)
    return res.redirect('/admin');

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.user_id), {$inc: {
    waiting_credit: -1 * parseInt(req.query.amount),
    overall_credit: parseInt(req.query.amount)
  }}, {}, (err, user) => {
    if (err) return res.redirect('/admin');

    Payment.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id), err => {
      if (err) return res.redirect('/admin');

      if (!user.invitor)
        return res.redirect('/admin/payments');

      User.findByIdAndUpdate(mongoose.Types.ObjectId(user.invitor), {$inc: {
        credit: 2
      }}, {}, err => {
        if (err) return res.redirect('/admin');

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.user_id), {$set: {
          invitor: null
        }}, {}, err => {
          if (err) return res.redirect('/admin');

          return res.redirect('/admin/payments');
        });
      });
    });
  });
}
