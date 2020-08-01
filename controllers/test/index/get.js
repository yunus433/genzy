const mongoose = require('mongoose');
const validator = require('validator');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !validator.isMongoId(req.query.id))
    return res.redirect('/campaigns');

  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/campaigns');

    const campaign = user.campaigns.find(campaign => campaign._id.toString() == req.query.id);

    if (!campaign)
      return res.redirect('/campaigns');

    return res.render('test/index', {
      page: 'test/index',
      title: campaign.name,
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      campaign
    });
  });
}
