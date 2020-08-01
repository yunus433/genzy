const mongoose = require('mongoose');

const Campaign = require('../../../../models/campaign/Campaign');

const array_equals = (one, two) => {
  return one.length == two.length && one.every((val, index) => val == two[index])
}

const object_array_equals = (one, two) => {
  return one.length == two.length && one.every((val, index) => array_equals(Object.keys(val), Object.keys(two[index])) && array_equals(Object.values(val), Object.values(two[index])))
}

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.price || !req.body.name || !req.body.description || !req.body.participant_number)
    return res.redirect('/admin');

  if (!req.body.gender)
    req.body.gender = 'both';
  else
    req.body.gender = req.body.gender.toLowerCase().trim()

  if (!req.body.min_birth_year)
    req.body.min_birth_year = 1920;

  if (!req.body.max_birth_year)
    req.body.max_birth_year = 2020;

  if (!req.body.questions)
    req.body.questions = [];
  else
    req.body.questions = JSON.parse(req.body.questions);

  Campaign.findById(mongoose.Types.ObjectId(req.query.id), (err, campaign) => {
    if (err) return res.redirect('/admin');

    Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      participant_number: req.body.participant_number,
      gender: req.body.gender,
      min_birth_year: req.body.min_birth_year,
      max_birth_year: req.body.max_birth_year,
      questions: req.body.questions,
      submitions: object_array_equals(req.body.questions, campaign.questions) ? campaign.submitions : []
    }}, {}, err => {
      if (err) return res.redirect('/admin');
  
      return res.redirect('/admin/campaigns');
    });
  });
}
