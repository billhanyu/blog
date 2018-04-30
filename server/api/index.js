const express = require('express');
const router = new express.Router();

router.use('/user', require('./users'));

// error handlers
// Catch unauthorised errors
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: err.name + ': ' + err.message });
  } else if (err.name === 'ValidationError') {
    const key = Object.keys(err.errors)[0];
    return res.status(422).json({
      message: key + ' ' + err.errors[key],
    });
  }
  next(err);
});

module.exports = router;
