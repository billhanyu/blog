const express = require('express');
const router = new express.Router();

router.use('/user', require('./user'));

// error handlers
// Catch unauthorised errors
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ 'message': err.name + ': ' + err.message });
  }
  next(err);
});

module.exports = router;
