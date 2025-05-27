const mongoose = require('mongoose');

const komentarSchema = new mongoose.Schema({
  isi: { type: String, required: true },
  beritaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Berita', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Komentar', komentarSchema);
