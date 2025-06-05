const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Simpan URL gambar profil dari Cloudinary
  fotoUrl: { type: String, default: '' },

  // Simpan public_id dari Cloudinary untuk manajemen gambar
  fotoPublicId: { type: String, default: '' },

  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
