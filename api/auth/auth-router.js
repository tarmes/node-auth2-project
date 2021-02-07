const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');
const { 
   checkPayload, 
   checkUsernameExists, 
   checkUsernameUnique,
   makeToken 
} = require('./authentication-middlewares');

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

router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
   console.log('logging in..');
   try {
      const verifies = bcrypt.compareSync(req.body.password, req.userData.password);
      if (verifies) {
         const token = makeToken(req.userData)
         res.status(200).json({ message: `Welcome to our API, ${req.userData.username}`, token });
      }
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