const Campaign = require('../../../../models/campaign/Campaign');

const uploadPhoto = require('../../../../utils/uploadPhoto');

module.exports = (req, res) => {
  if (!req.file || !req.file.filename || !req.body || !req.body.price || !req.body.name || !req.body.description || !req.body.participant_number)
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

  uploadPhoto(req.file.filename, req.file.size, (err, location) => {
    if (err) return res.redirect('/admin');

    const newCampaignData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      participant_number: req.body.participant_number,
      photo: location,
      gender: req.body.gender,
      min_birth_year: req.body.min_birth_year,
      max_birth_year: req.body.max_birth_year,
      questions: req.body.questions
    };

    const newCampaign = new Campaign(newCampaignData);

    newCampaign.save(err => {
      if (err) return res.redirect('/admin');

      return res.redirect('/admin/campaigns');
    });
  });
}
