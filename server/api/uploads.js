const express = require('express');
const router = new express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../auth');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');

const { ALLOWED_EXTENSIONS, MAX_SIZE } = require('../config');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Image.findById(id).exec()
    .then(image => {
      if (!image) {
        return res.sendStatus(404);
      }
      res.contentType(image.contentType);
      res.send(image.data);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        return res.sendStatus(404);
      }
      next(err);
    });
});

router.post('/', [auth.admin, upload.single('upload')], (req, res, next) => {
  const filename = req.file.originalname;
  const path = req.file.path;

  const splitArr = filename.split('.');
  const extension = splitArr.pop().toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    removeFile(path);
    return res.status(403).json({ message: 'Forbidden file extension' });
  }

  if (req.file.size > MAX_SIZE) {
    removeFile(path);
    return res.status(403).json({ message: `File exceeds maximum allowed size: ${MAX_SIZE / 1000000} MB` });
  }

  const image = new Image({
    data: fs.readFileSync(path),
    contentType: `image/${extension}`,
  });
  image.save()
    .then(saved => res.json({ path: `uploads/${saved._id}` }))
    .then(() => removeFile(path))
    .catch(next);
});

function removeFile(path) {
  fs.unlink(path, err => {
    if (err) console.log(err);
  });
}

module.exports = router;
