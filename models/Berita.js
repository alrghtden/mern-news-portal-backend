const mongoose = require('mongoose');

const beritaSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  isi: { type: String, required: true },
  gambar: { type: String },
  tanggal: { type: Date, default: Date.now },
  kategori: { type: String, required: true }
});

module.exports = mongoose.model('Berita', beritaSchema);