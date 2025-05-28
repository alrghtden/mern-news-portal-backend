const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const beritaRoutes = require('./routes/beritaRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const komentarRoutes = require('./routes/komentarRoutes');

const { createRouteHandler } = require('uploadthing/express');
const { uploadRouter } = require('./uploadthing');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://mern-news-portal-u5qs.vercel.app',
  credentials: true
}));

app.use(express.json());

app.use(
  '/api/uploadthing',
  createRouteHandler({
    router: uploadRouter,
    config: {
      Secret: process.env.UPLOADTHING_SECRET
    },
  })
);

app.use('/api/berita', beritaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/komentar', komentarRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
