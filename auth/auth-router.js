const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require('express').Router();

const Users= require('./users-model.js')

function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string");
}

router.post('/register', (req, res) => {
  const credentials = req.body;
if(ivValid(credentials)){
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcryptjs.hashSync(credentials.password, rounds);
  credentials.password = hash;
  Users.add(crdentials)
  .then(user=>{
    res.status(201).json({ data: user})
  })
  .catch(error=>{
    res.status(500).json({ message: error.message})
  })
}else{
  res.status(400).json({
    message: "please provide username and password, password shoud be alphanumeric",
  }); 
}

});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(isValid(req.body)){
      Users.findBy({ "users.username": username})
          .then(([user])=>{
              if(user && bcryptjs.compareSync(password, user.password)){
                  Users.login(user.id)
                  .then(usr=>{
                      const token = createToken(user);
                      res.status(200).json({ message: "Login succesful", token})
                  })
              } else{
                  res.status(401).json({ message: "Invalid credentials" });
              }
          })
          .catch(err=>{
              res.status(500).json({ message: err.message });
          })
  } else{
      res.status(400).json({
          message: "please provide username and password, password shoud be alphanumeric",
        }); 
  }
});

module.exports = router;
