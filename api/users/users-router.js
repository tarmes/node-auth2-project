const express = require('express');

const Users = require('./users-model');
const { restricted, checkRole } = require('./authorization-middlewares');

const router = express.Router();

router.get('/', restricted, checkRole('admin'), (req, res) => {
   Users.find()
      .then(users => {
         res.json(users);
      })
      .catch(error => {
         res.status(500).json({ message: error.message })
      })
})

module.exports = router;