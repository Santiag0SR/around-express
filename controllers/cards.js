const Card = require('../models/card');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/error');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: err.message,
        });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'An error has ocurred on the server' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'An error has ocurred on the server' })
    );
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      const error = new Error('No card found for the specified id');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((card) =>
      card.deleteOne(card).then((card) => res.send({ data: card }))
    )
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

const updateLike = (req, res, method) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: req.user._id } },
    { new: true } // get the card after the update
  )
    .orFail(() => {
      const error = new Error('No card found for the specified id');
      error.statusCode = BAD_REQUEST;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
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

const likeCard = (req, res) => updateLike(req, res, '$addToSet');
const dislikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
