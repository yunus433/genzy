const mongoose = require('mongoose');

const Campaign = require('../../../../models/campaign/Campaign');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Campaign.findById(mongoose.Types.ObjectId(req.query.id), (err, campaign) => {
    if (err || !campaign) return res.redirect('/admin');

    return res.render('admin/campaigns/details', {
      page: 'admin/campaigns/details',
      title: campaign.name,
      includes: {
        external: ['css', 'js', 'admin_general_css', 'fontawesome']
      },
      campaign,
      type_names: {
        short_text: "Kısa Yazılı",
        long_text: "Uzun Yazılı",
        radio: "Tek Seçmeli",
        checked: "Çok Seçmeli"
      }
    });
  });
}
