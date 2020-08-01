const mongoose = require('mongoose');
const validator = require('validator');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.body.name || !req.body.phone) {
    req.session.error = 'Lütfen gerekli bütün bilgileri girin.'
    return res.redirect('/profile');
  }

  if (!validator.isMobilePhone(req.body.phone.trim())) {
    req.session.error = 'Girdiğiniz telefon numarası geçerli değil.'
    return res.redirect('/profile');
  }

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
    name: req.body.name,
    phone: req.body.phone
  }}, {new: true}, (err, user) => {
    if (err && err.code == 11000) {
      req.session.error = 'Bu telefon numarası zaten kayıtlı, lütfen başka bir numara deneyin.'
      return res.redirect('/profile');
    }
    if (err || !user) {
      req.session.error = 'Bilinmeyen bir hata oluştu, lütfen daha sonra tekrar deneyin.';
      return res.redirect('/profile');
    }

    req.session.user = user;
    return res.redirect('/profile');
  });
}
