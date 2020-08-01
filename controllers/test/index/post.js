const mongoose = require('mongoose');
const validator = require('validator');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.answers)
    return res.sendStatus(500);

  if (!validator.isMongoId(req.query.id))
    return res.sendStatus(500);

  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.sendStatus(500);

    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
      campaigns: user.campaigns.map(campaign => {
        if (campaign._id.toString() == req.query.id) {
          campaign.answers = req.body.answers;
          campaign.status = "saved";
          campaign.error = null;
        }
          
        return campaign;
      })
    }}, {new: true}, (err, user) => {
      if (err || !user) return res.sendStatus(500);

      return res.sendStatus(200);
    });
  });
}
