// middleware/verifyToken.js

const admin = require('firebase-admin');
const { decodeBase64WithKey } = require('../utils/firebase');

const checkUserType = (requiredType) => {
   return async (req, res, next) => {
      try {
         const authorizationHeader = req.headers['x-api-key'];
         // const idToken = req.headers.authorization;
         // console.log(idToken)
         const token = authorizationHeader;
         type = decodeBase64WithKey(token);
         console.log(type == requiredType);
         if (type == requiredType) {
            return next(); // Proceed to the next middleware (or route handler)
         } else {
            // Send error response if authorization fails
            return res.status(403).json({ message: "Authorization failed" });
         }
      } catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Internal server error" });
      }
   };
};

  

module.exports = { checkUserType };
