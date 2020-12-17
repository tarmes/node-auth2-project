const Users = require('../users/users-model');

const checkPayload = (req, res, next) => {
   if ( !req.body.username && !req.body.password ) {
      res.status(401).json({ message: 'Must have username and password!'}); 
   } else {
      next();
   }
};

const checkUsernameUnique = async (req, res, next) => {
   try {
      const rows = Users.findBy({ username: req.body.username });
      if (!rows.length) {
         next();
      } else {
         res.status(401).json('username taken!');
      }
   } catch (error) {
      res.status(500).json({ message: 'something terrible happened!!'})
   }
};

const checkUsernameExists = async (req, res, next) => {
   try {
      const rows = await Users.findBy({ username: req.body.username });
      if (rows.length) {
         req.userData = rows[0];
         next();         
      } else {
         res.status(404).json('No such username!');
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

module.exports = {
   checkPayload,
   checkUsernameExists,
   checkUsernameUnique
}