const User = require('../models/user');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/error');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: err.message,
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'An error ocurred' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'An error has ocurred on the server' })
    );
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('No card found for the specified id');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid card id' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'An error occurred' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error('No user found for the specified id');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid user id' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'An error occurred' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error('No user found for the specified id');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid user id' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'An error occurred' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
