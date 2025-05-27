const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const beritaController = require('../controllers/beritaController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get('/', beritaController.getAllBerita);
router.get('/:id', beritaController.getBeritaById);
router.post('/', upload.single('gambar'), beritaController.createBerita);
router.put('/:id', upload.single('gambar'), beritaController.updateBerita);
router.delete('/:id', beritaController.deleteBerita);

module.exports = router;
