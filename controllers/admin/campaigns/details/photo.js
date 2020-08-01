const mongoose = require('mongoose');

const Campaign = require('../../../../models/campaign/Campaign');

const uploadPhoto = require('../../../../utils/uploadPhoto');
const deletePhoto = require('../../../../utils/deletePhoto');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.file || !req.file.filename)
    return res.redirect('/admin');

  uploadPhoto(req.file.filename, req.file.size, (err, location) => {
    if (err) return res.redirect('/admin');

    Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      photo: location
    }}, {new: false}, (err, campaign) => {
      if (err) return res.redirect('/admin');

      deletePhoto(campaign.photo, err => {
        if (err) return res.redirect('/admin');

        return res.redirect('/admin/campaigns');
      });
    });
  });
}
