const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/beritaController');

router.get('/', beritaController.getAllBerita);
router.get('/:id', beritaController.getBeritaById);
router.post('/', beritaController.createBerita);
router.put('/:id', beritaController.updateBerita);
router.delete('/:id', beritaController.deleteBerita);

module.exports = router;
