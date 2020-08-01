const async = require('async');
const mongoose = require('mongoose');

const User = require('../../../../models/user/User');
const Campaign = require('../../../../models/campaign/Campaign');

const deletePhoto = require('../../../../utils/deletePhoto');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    ended: true,
    submitions: []
  }}, {}, (err, campaign) => {
    if (err || !campaign) return res.redirect('/admin');

    async.times(
      campaign.participants.length,
      (time, next) => {
        User.findById(mongoose.Types.ObjectId(campaign.participants[time]), (err, user) => {
          if (err) return next(err);

          User.findByIdAndUpdate(mongoose.Types.ObjectId(campaign.participants[time]), {$set: {
            campaigns: user.campaigns.map(cam => {
              if (cam._id.toString() == campaign._id.toString()) {
                return {
                  _id: cam._id,
                  name: cam.name,
                  description: cam.description,
                  price: cam.price,
                  photo: cam.photo,
                  questions: cam.questions,
                  error: cam.error,
                  status: cam.status == "approved" ? "deleted/approved" : "deleted",
                  answers: cam.answers
                };
              } else {
                return cam;
              }
            })
          }}, {}, err => next(err));
        });
      },
      err => {
        if (err) return res.redirect('/admin');

        return res.redirect('/admin/campaigns');
      }
    );
  });
}
