const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
// Define Schema
let userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: 'Full name is required'
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: 'Email ID is required',
    unique: true
  },
  phone: {
    type: String,
    required: 'Phone cannot be empty',
    unique: true
  },
  city: {
    type: String,
    required: 'City cannot be empty'
  },
  password: {
    type: String,
    required: 'Password cannot be empty',
    minlength : [4,'Password must be atleast 4 character long']
  },
  problem: {
    type: String,
    required: 'Problem cannot be empty'
  },
  usertype: {
    type: Number
  },
  saltSecret: String
}, {
    collection: 'users'
  });

  // Custom validation for email
userSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          this.saltSecret = salt;
          next();
      });
  });
});



module.exports = mongoose.model('User', userSchema);
