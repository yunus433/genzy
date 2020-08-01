const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  participant_number: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  min_birth_year: {
    type: Number,
    required: true
  },
  max_birth_year: {
    type: Number,
    required: true
  },
  participants: {
    type: Array,
    default: []
  },
  submitions: {
    type: Array,
    default: []
  },
  accepted_submitions: {
    type: Array,
    default: []
  },
  questions: {
    type: Array,
    default: []
  },
  ended: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
