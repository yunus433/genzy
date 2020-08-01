const Payment = require('../../../../models/payment/Payment');

module.exports = (req, res) => {
  Payment.find({}, (err, payments) => {
    if (err) return res.redirect('/admin');

    return res.render('admin/payments', {
      page: 'admin/payments',
      title: 'Ödemeler',
      includes: {
        external: ['css', 'admin_general_css', 'fontawesome']
      },
      payments
    });
  })
}
