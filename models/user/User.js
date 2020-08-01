const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    minlength: 1,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  completed: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  birth_year: {
    type: Number,
    default: null
  },
  campaigns: {
    type: Array,
    default: []
  },
  campaign_ids: {
    type: Array,
    default: []
  },
  paid_campaigns: {
    type: Array,
    default: []
  },
  payment_number: {
    type: String,
    default: null
  },
  credit: {
    type: Number,
    default: 0
  },
  waiting_credit: {
    type: Number,
    default: 0
  },
  overall_credit: {
    type: Number,
    default: 0
  }
});

UserSchema.pre('save', hashPassword);

UserSchema.statics.findUser = function (email, password, callback) {
  let User = this;

  User.findOne({email}).then(user => { 
    if (!user) {
        return callback(true);
    }

    verifyPassword(password, user.password, (res) => {
      if (res) return callback(null, user);
      
      return callback(true);
    });
  });
};


module.exports = mongoose.model('User', UserSchema);
