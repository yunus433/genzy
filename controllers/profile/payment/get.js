const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Payment = require('../../../models/payment/Payment');

module.exports = (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/profile');

    if (user.credit < 10) {
      req.session.payment_error = res.__('Paranızı çekebilmek için bakiyeniz en az 10₺ olmalıdır');
      return res.redirect('/profile');
    }

    if (!user.payment_number) return res.redirect('/profile');

    const newPaymentData = {
      user_id: user._id,
      payment_number: user.payment_number,
      amount: user.credit
    };

    const newPayment = new Payment(newPaymentData);

    newPayment.save(err => {
      if (err) return res.redirect('/profile');

      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
        credit: 0,
        waiting_credit: user.waiting_credit + user.credit
      }}, {new: true}, (err, user) => {
        if (err) return res.redirect('/profile');

        req.session.user = user;

        return res.redirect('/profile');
      });
    });
  });
}
