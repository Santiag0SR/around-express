const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String, // the name is a string
    required: true, // every user has a name, so it's a required field
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length is 30 characters
  },
  link: {
    type: String,
    required: [true, 'url required'],
    validate: {
      validator(v) {
        return v.match(/https?:\/\/[a-z A-Z \- \/ . 0-9 _]{1,}/gi);
      },
      message: 'Sorry. You have to enter a valid link for the picture',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
