const beritaSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  isi: { type: String, required: true },
  gambarUrl: { type: String },       // URL gambar yang bisa langsung ditampilkan
  gambarPublicId: { type: String }, // public_id untuk manajemen gambar Cloudinary
  tanggal: { type: Date, default: Date.now },
  kategori: { type: String, required: true }
});
