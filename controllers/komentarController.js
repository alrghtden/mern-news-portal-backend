const Komentar = require('../models/Komentar');
const User = require('../models/User');

exports.tambahKomentar = async (req, res) => {
  try {
    const { isi, beritaId } = req.body;
    const userId = req.userId;

    if (isi.trim().length > 500) {
      return res.status(400).json({ message: 'Komentar maksimal 500 karakter' });
    }

    const komentar = new Komentar({
      isi,
      beritaId,
      user: userId,
    });

    await komentar.save();
    res.status(201).json({ message: 'Komentar berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan komentar', error: err.message });
  }
};

exports.getKomentarByBerita = async (req, res) => {
  try {
    const { beritaId } = req.params;

    const komentar = await Komentar.find({ beritaId })
      .populate('user', 'nama foto')
      .sort({ createdAt: -1 });

    res.json(komentar);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil komentar', error: err.message });
  }
};

exports.hapusKomentar = async (req, res) => {
  try {
    const komentarId = req.params.id;
    const userId = req.userId;

    const komentar = await Komentar.findById(komentarId);
    if (!komentar) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan' });
    }

    if (komentar.user.toString() !== userId) {
      return res.status(403).json({ message: 'Akses ditolak. Anda bukan pemilik komentar ini.' });
    }

    await Komentar.findByIdAndDelete(komentarId);
    res.json({ message: 'Komentar berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus komentar', error: err.message });
  }
};
