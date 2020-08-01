const async = require('async');
const mongoose = require('mongoose');

const User = require('../../models/user/User');
const Campaign = require('../../models/campaign/Campaign');

const array_equals = (one, two) => {
  return one.length == two.length && one.every((val, index) => val == two[index])
}

const object_array_equals = (one, two) => {
  return one.length == two.length && one.every((val, index) => array_equals(Object.keys(val), Object.keys(two[index])) && array_equals(Object.values(val), Object.values(two[index])))
}

module.exports = (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/campaigns');

    async.times(
      user.campaigns.length,
      (time, next) => {
        Campaign.findById(mongoose.Types.ObjectId(user.campaigns[time]._id), (err, campaign) => {
          if (err) return next(err);

          // if (object_array_equals(user.campaigns[time].questions, campaign.questions) || campaign.ended)
            return next(null, {
              _id: campaign._id,
              name: campaign.name,
              description: campaign.description,
              price: campaign.price,
              photo: campaign.photo,
              questions: user.campaigns[time].questions,
              error: user.campaigns[time].error,
              status: user.campaigns[time].status,
              answers: user.campaigns[time].answers
            });
          
          // return next(null, {
          //   _id: campaign._id,
          //   name: campaign.name,
          //   description: campaign.description,
          //   price: campaign.price,
          //   photo: campaign.photo,
          //   questions: campaign.questions,
          //   error: "Kampanya soruları güncellendi, lütfen soruları bir daha cevaplayın.",
          //   status: "unapproved",
          //   answers: campaign.questions.map(question => question.type == 'checked' ? [] : "")
          // });
        });
      },
      (err, campaigns) => {
        if (err) return res.redirect('/');

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
          campaigns
        }}, {}, err => {
          if (err) return res.redirect('/');

          return res.render('history/index', {
            page: 'history/index',
            title: 'Paylaşım Geçmişi',
            includes: {
              external: ['css', 'js', 'fontawesome']
            },
            campaigns
          });
        });
      }
    );
  });
}
