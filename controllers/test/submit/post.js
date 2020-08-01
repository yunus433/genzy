const mongoose = require('mongoose');
const validator = require('validator');

const User = require('../../../models/user/User');
const Campaign = require('../../../models/campaign/Campaign');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !validator.isMongoId(req.query.id) || !req.body || !req.body.answers)
    return res.sendStatus(500);

  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.sendStatus(500);

    let answers = req.body.answers;

    if (answers.filter(each => !each.length).length)
      return res.redirect('/test?id=' + req.query.id);

    const campaigns = user.campaigns.map(campaign => {
      if (campaign._id.toString() == req.query.id) {
        campaign.answers = req.body.answers;
        campaign.status = "waiting";
      }

      return campaign;
    });

    Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$push: {
      submitions: {
        user_id: req.session.user._id,
        answers
      }
    }}, {}, (err, campaign) => {
      if (err || !campaign) return res.sendStatus(500);

      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
        campaigns
      }}, {new: true}, (err, user) => {
        if (err || !user) return res.sendStatus(500);

        req.session.user = user;

        return res.sendStatus(200);
      });
    });
  });
}
