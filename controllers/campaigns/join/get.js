const mongoose = require('mongoose');
const validator = require('validator')

const User = require('../../../models/user/User');
const Campaign = require('../../../models/campaign/Campaign');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/campaigns');

  if (!validator.isMongoId(req.query.id))
    return res.redirect('/campaigns');
  
  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/campaigns');
  
    Campaign.findOne({
      $and: [
        { _id: mongoose.Types.ObjectId(req.query.id) },
        { _id: {$nin: user.campaign_ids} }
      ],
      ended: false,
      $or: [
        { gender: "both" },
        { gender: user.gender }
      ],
      max_birth_year: { $gte: user.birth_year },
      min_birth_year: { $lte: user.birth_year },
    }, (err, campaign) => {
      if (err || !campaign) return res.redirect('/campaigns');
  
      const newCampaignObject = {
        _id: campaign._id.toString(),
        name: campaign.name,
        description: campaign.description,
        price: campaign.price,
        photo: campaign.photo,
        status: "saved",
        questions: campaign.questions,
        answers: campaign.questions.map(question => question.type == 'checked' ? [] : ""),
        error: null
      };
  
      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$push: {
        campaign_ids: campaign._id,
        campaigns: newCampaignObject
      }}, {new: true}, (err, user) => {
        if (err) return res.redirect('/campaigns');

        Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {
          $push: {
            participants: user._id.toString()
          }
        }, {}, (err, campaign) => {
          if (err) return res.redirect('/campaigns');

          req.session.user = user;
          return res.redirect('/test?id=' + campaign._id.toString());
        });
      });
    });
  });
}
