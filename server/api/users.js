const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const express = require('express');
const router = new express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  if (req.body.password.length < 6) {
    return res.status(422).json({message: 'password needs to be at least 6 characters'});
  }

  user.setPassword(req.body.password);

  user.save()
    .then(() => {
      let token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        token,
      });
    })
    .catch(err => next(err));
});

// format is Authorization: Bearer [token]
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    let token;

    // If Passport throws/catches an error
    if (err) {
      return next(err);
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

router.get('/profile', auth.noob, (req, res, next) => {
  res.status(200).json(req.user.toProfileJSON());
});

module.exports = router;
