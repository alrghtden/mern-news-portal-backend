const User = require('../models/User');
const bcrypt = require('bcrypt');
const cloudinary = require('../config/cloudinary');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data user' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil user' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10);

    let foto = null;
    let fotoPublicId = null;

    if (req.file) {
      foto = req.file.path;
      fotoPublicId = req.file.filename;
    } else {
      foto = 'https://res.cloudinary.com/demo/image/upload/v1234567890/default_profpic.png';
      fotoPublicId = null;
    }

    const newUser = new User({
      nama,
      email,
      password: hashedPassword,
      role,
      foto,
      fotoPublicId,
    });

    await newUser.save();
    res.status(201).json({ message: 'User berhasil ditambahkan', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambahkan user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    const { nama, email, password, role } = req.body;

    user.nama = nama;
    user.email = email;
    user.role = role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      if (user.fotoPublicId) {
        await cloudinary.uploader.destroy(user.fotoPublicId);
      }

      user.foto = req.file.path;
      user.fotoPublicId = req.file.filename;
    }

    await user.save();
    res.json({ message: 'User berhasil diperbarui', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal memperbarui user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    if (user.fotoPublicId) {
      await cloudinary.uploader.destroy(user.fotoPublicId);
    }

    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menghapus user' });
  }
};
