const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');
const { 
   checkPayload, 
   checkUsernameExists, 
   checkUsernameUnique} = require('./auth-middlewares');

router.post('/register', checkPayload, checkUsernameUnique, async (req, res) => {
   console.log('registering..');
   try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = await Users.add({ ...req.body, password: hash });
      res.status(201).json(newUser);
   } catch (error) {
      res.status(500).json({ message: error.message })
   }
})

router.post('/login', async (req, res) => {
   try {

   } catch (error) {
      res.status(500).json({ message: error.message })
   }
})

router.post('/logout', async (req, res) => {
   try {

   } catch (error) {
      res.status(500).json({ message: error.message })
   }
})

module.exports = router;