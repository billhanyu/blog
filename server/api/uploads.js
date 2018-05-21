const express = require('express');
const router = new express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { ALLOWED_EXTENSIONS, MAX_SIZE } = require('../config');

router.post('/', upload.single('upload'), (req, res, next) => {
  const filename = req.file.originalname;
  const path = req.file.path;

  const splitArr = filename.split('.');
  if (splitArr.length === 1 || !ALLOWED_EXTENSIONS.includes(splitArr.pop().toLowerCase())) {
    removeFile(path);
    return res.status(403).json({ message: 'Forbidden file extension' });
  }

  if (req.file.size > MAX_SIZE) {
    removeFile(path);
    return res.status(403).json({ message: `File exceeds maximum allowed size: ${MAX_SIZE / 1000000} MB` });
  }

  res.json({ path: req.file.path });
});

function removeFile(path) {
  fs.unlink(path, err => {
    if (err) console.log(err);
  });
}

module.exports = router;
