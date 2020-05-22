/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
var jwtDecode = require('jwt-decode');

const Users = require('../auth/users-model.js')

module.exports = (req, res, next) => {
  console.log(req.headers)
  var decoded = jwtDecode(req.headers.authorization)
  Users.findBy({ "users.username": decoded.username })
      .then(([user]) => {
          if (user.loggedIn == true) {
              req.user = user;
              next()
          } else {
            res.status(401).json({ you: 'shall not pass!' });
          }
      })
};
