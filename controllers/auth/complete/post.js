const mongoose = require('mongoose');
const validator = require('validator');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.name || !req.body.phone || !req.body.gender || !req.body.birth_year) {
    req.session.error = 'Lütfen bütün bilgileri girin';
    return res.redirect('/auth/complete');
  }

  if (!validator.isMobilePhone(req.body.phone.trim())) {
    req.session.error = 'Lütfen geçerli bir telefon numarası girin';
    return res.redirect('/auth/complete');
  }

  if (!validator.isNumeric(req.body.birth_year.trim(), { no_symbols: true })) {
    req.session.error = 'Lütfen doğduğunuz yılı girin';
    return res.redirect('/auth/complete');
  }

  if (parseInt(req.body.birth_year) < 1920 || parseInt(req.body.birth_year) > 2020) {
    req.session.error = 'Lütfen doğduğunuz yılı girin';
    return res.redirect('/auth/complete');
  }

  if (!['erkek', 'kadın'].includes(req.body.gender.toLowerCase().trim())) {
    req.session.error = 'Lütfen cinsiyetinizi Kadın ya da Erkek olarak belirtin';
    return res.redirect('/auth/complete');
  }

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
    name: req.body.name.trim(),
    phone: req.body.phone.trim(),
    gender: req.body.gender.toLowerCase().trim(),
    birth_year: parseInt(req.body.birth_year.trim()),
    completed: true
  }}, {new: true}, (err, user) => {
    if (err && err.code == 11000) {
      req.session.error = 'Bu telefon numarası zaten kayıtlı, lütfen başka bir numara deneyin';
      return res.redirect('/auth/complete');
    }

    if (err || !user) {
      req.session.error = 'Bilinmeyen bir hata oluştu, lütfen daha sonra tekrar deneyin';
      return res.redirect('/auth/complete');
    }

    req.session.user = user;
    return res.redirect('/campaigns');
  });
}
