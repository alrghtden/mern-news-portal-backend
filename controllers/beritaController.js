const Berita = require('../models/Berita');

exports.getAllBerita = async (req, res) => {
  try {
    const berita = await Berita.find().sort({ tanggal: -1 });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil berita' });
  }
};

exports.getBeritaById = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) return res.status(404).json({ error: 'Berita tidak ditemukan' });
    res.json(berita);
  } catch (err) {
    res.status(404).json({ error: 'Berita tidak ditemukan' });
  }
};

exports.createBerita = async (req, res) => {
  const { judul, isi, kategori, gambar } = req.body;

  try {
    const newBerita = new Berita({ judul, isi, kategori, gambar });
    await newBerita.save();
    res.status(201).json(newBerita);
  } catch (err) {
    res.status(400).json({ error: 'Gagal membuat berita' });
  }
};

exports.updateBerita = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) return res.status(404).json({ error: 'Berita tidak ditemukan' });

    const { judul, isi, kategori, gambar } = req.body;

    berita.judul = judul;
    berita.isi = isi;
    berita.kategori = kategori;
    berita.gambar = gambar;

    await berita.save();
    res.json(berita);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengupdate berita' });
  }
};

exports.deleteBerita = async (req, res) => {
  try {
    await Berita.findByIdAndDelete(req.params.id);
    res.json({ message: 'Berita berhasil dihapus' });
  } catch (err) {
    res.status(400).json({ error: 'Gagal menghapus berita' });
  }
};
