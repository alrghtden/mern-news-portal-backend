const User = require('../models/User');
const bcrypt = require('bcrypt');

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
    const { nama, email, password, role, foto } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      nama,
      email,
      password: hashedPassword,
      role,
      foto: foto || 'https://via.placeholder.com/150' // default foto jika kosong
    });

    await newUser.save();
    res.status(201).json({ message: 'User berhasil ditambahkan', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    const { nama, email, password, role, foto } = req.body;

    user.nama = nama;
    user.email = email;
    user.role = role;
    if (foto) user.foto = foto;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: 'User berhasil diperbarui', user });
  } catch (err) {
    res.status(500).json({ error: 'Gagal memperbarui user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus user' });
  }
};
