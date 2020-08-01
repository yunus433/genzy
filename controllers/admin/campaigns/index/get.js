const Campaign = require('../../../../models/campaign/Campaign');

module.exports = (req, res) => {
  Campaign.find({}, (err, campaigns) => {
    if (err) return res.redirect('/admin');

    return res.render('admin/campaigns', {
      page: 'admin/campaigns',
      title: 'Kampanyalar',
      includes: {
        external: ['css', 'js', 'admin_general_css', 'fontawesome']
      },
      campaigns
    });
  })
}
