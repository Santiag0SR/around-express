// Mongo Server address
const MONGO_SERVER = 'mongodb://localhost:27017/aroundb';

// Response and error constants
const OK = 200;
const CREATED = 202;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  OK,
  CREATED,
  MONGO_SERVER,
};
