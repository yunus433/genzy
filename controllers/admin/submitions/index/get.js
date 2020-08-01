const async = require('async');
const mongoose = require('mongoose');

const Campaign = require('../../../../models/campaign/Campaign');
const User = require('../../../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  

  Campaign.findById(mongoose.Types.ObjectId(req.query.id), (err, campaign) => {
    if (err || !campaign) return res.redirect('/admin');

    async.times(
      Math.min(campaign.submitions.length, 50),
      (time, next) => {
        User.findById(mongoose.Types.ObjectId(campaign.submitions[time].user_id), (err, user) => {
          if (err) return next(err);

          return next(null, {
            user,
            answers: campaign.submitions[time].answers
          });
        });
      },
      (err, submitions) => {
        if (err) return res.redirect('/admin');

        return res.render('admin/submitions', {
          page: 'admin/submitions',
          title: campaign.name,
          includes: {
            external: ['css', 'admin_general_css', 'fontawesome']
          },
          campaign,
          submitions
        });
      }
    );
  });
}
