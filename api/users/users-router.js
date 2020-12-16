const express = require('express');

const Users = require('./users-model');

const router = express.Router();

router.get('/', (req, res) => {
   Users.find()
      .then(users => {
         res.json(users);
      })
      .catch(error => {
         res.send(error)
      })
})

module.exports = router;