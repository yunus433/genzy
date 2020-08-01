const mongoose = require('mongoose');

const User = require('../../../../models/user/User');
const Campaign = require('../../../../models/campaign/Campaign');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.query.user || !req.body || !req.body.reason)
    return res.redirect('/admin');

  Campaign.findById(mongoose.Types.ObjectId(req.query.id), (err, campaign) => {
    if (err || !campaign) return res.redirect('/admin');

    const submitions = campaign.submitions.filter(sub => sub.user_id.toString() != req.query.user);

    if (submitions.length == campaign.submitions.length)
      return res.redirect('/admin');
    
    Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      submitions
    }}, {}, err => {
      if (err) return res.redirect('/admin');

      User.findById(mongoose.Types.ObjectId(req.query.user), (err, user) => {
        if (err || !user) return res.redirect('/admin');

        const campaigns = user.campaigns.map(campaign => {
          if (campaign._id.toString() == req.query.id.toString()) {
            return {
              _id: campaign._id,
              name: campaign.name,
              description: campaign.description,
              status: "unapproved",
              error: req.body.reason,
              price: campaign.price,
              photo: campaign.photo,
              questions: campaign.questions,
              answers: campaign.answers
            };
          } else {
            return campaign;
          }
        });

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.user), {
          $set: { campaigns }
        }, {}, (err, user) => {
          if (err || !user) return res.redirect('/admin');

          return res.redirect('/admin/submitions?id=' + req.query.id);
        });
      });
    });
  });
}
