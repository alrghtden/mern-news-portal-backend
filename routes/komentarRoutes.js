const express = require('express');
const komentarController = require('../controllers/komentarController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, komentarController.tambahKomentar);
router.get('/berita/:beritaId', komentarController.getKomentarByBerita);
router.delete('/:id', authMiddleware, komentarController.hapusKomentar);


module.exports = router;
