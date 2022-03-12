const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      // every user has a name field, the requirements for which are described below:
      type: String, // the name is a string
      required: true, // every user has a name, so it's a required field
      minlength: 2, // the minimum length of the name is 2 characters
      maxlength: 30, // the maximum length is 30 characters
    },
    about: {
      // every user has a about field, the requirements for which are described below:
      type: String, // the about is a string
      required: true, // every user has a name, so it's a required field
      minlength: 2, // the minimum length of the name is 2 characters
      maxlength: 30, // the maximum length is 30 characters
    },
    avatar: {
      type: String, // the avatar is a string
      required: [true, 'url required'],

      validate: {
        validator(value){
          return /https?:\/\/[a-z A-Z \- \/ . 1-9]{1,}\/gi.test(value)
        },
        message: 'The "avatar" field must be a valid URL',
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
