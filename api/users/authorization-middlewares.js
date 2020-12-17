const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
   const token = req.headers.authorization;
   if (!token) {
      res.status(401).json({ message: 'we want a token!' })
   } else {
      jwt.verify(token, 'foo', (err, decoded) => {
         if (err) {
            res.status(401).json({ message: 'we want a GOOD token!' }, err.message );
         } else {
            req.decodedToken = decoded;
            next();
         }
      });
   }
};

const checkRole = (role) => (req, res, next) => {
   if (req.decodedToken.role === role) {
      next()
   } else {
      res.status(403).json({ message: 'you have no power here!' })
   }
}

module.exports = {
   restricted,
   checkRole
}