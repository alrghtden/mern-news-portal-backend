const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const beritaRoutes = require('./routes/beritaRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const komentarRoutes = require('./routes/komentarRoutes');

// Inisialisasi app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://mern-news-portal-u5qs.vercel.app', // sesuaikan dengan domain frontend Anda
  credentials: true
}));
app.use(express.json());

// Static file hanya digunakan jika masih memakai lokal uploads
// Tidak wajib digunakan jika semuanya sudah di Cloudinary
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routing
app.use('/api/berita', beritaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/komentar', komentarRoutes);

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => console.error('MongoDB connection error:', err));
