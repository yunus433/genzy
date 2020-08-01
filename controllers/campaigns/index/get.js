const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Campaign = require('../../../models/campaign/Campaign');

module.exports = (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/');

    Campaign.find({
      _id: {$nin: user.campaign_ids},
      $or: [
        { gender: "both" },
        { gender: user.gender }
      ],
      max_birth_year: { $gte: user.birth_year },
      min_birth_year: { $lte: user.birth_year },
      ended: false
    }, (err, campaigns) => {
      if (err) return res.redirect('/');

      return res.render('campaigns/index', {
        page: 'campaigns/index',
        title: 'Oyunlar',
        includes: {
          external: ['css', 'js', 'fontawesome']
        },
        campaigns
      });
    })
  });
}
