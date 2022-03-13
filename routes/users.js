const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/:id', updateAvatar);

module.exports = router;

// In the body of the POST request for creating a user,
//  pass a JSON object with three fields: name, about, and avatar.
