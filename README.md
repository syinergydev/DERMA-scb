# DERMA scb Krian — Website Demo

Website multi-halaman untuk Praktek Dr. Jeanny & Klinik Kecantikan DERMA scb (Krian, Sidoarjo). Dibuat sebagai konsep demo oleh SynergyDev. HTML, CSS, dan JavaScript statis, tanpa backend.

## Struktur
```
index.html        Beranda
tentang.html      Tentang Kami
layanan.html      Treatment
produk.html       Produk skincare
galeri.html       Galeri (filter + lightbox)
promo.html        Promo (tanpa promo aktif yang belum terverifikasi)
reservasi.html    Formulir reservasi -> pesan WhatsApp
kontak.html       Kontak dan lokasi
css/style.css
js/main.js
assets/brand/     logo
assets/images/    foto terpilih
assets/videos/    clip interior (4 detik)
robots.txt, sitemap.xml
```

## Membuka lokal
Buka `index.html` langsung di browser. Font dan GSAP dimuat dari CDN, sehingga perlu koneksi internet.

## Deploy ke GitHub Pages
1. Buat repository baru, misalnya `derma-scb`.
2. Upload seluruh isi folder ini ke root repository (`index.html` harus berada di root).
3. Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Ganti `USERNAME` pada `sitemap.xml` dan `robots.txt` dengan URL GitHub Pages Anda.

## Yang perlu dikonfirmasi klien
- Jam operasional terbaru (materi lama menulis Senin–Sabtu 12.00–20.00; Google Maps mencantumkan tutup 20.00).
- Nomor kontak tambahan 0896-8226-2078 belum ditampilkan. Tampilkan hanya setelah diverifikasi.
- Profil dokter (gelar, spesialisasi, pengalaman). Saat ini hanya nama praktek.
- Nama lengkap "Acne Series" dan foto untuk Bright & Glow Premium UV dan Body Lotion Whitening.
- Harga treatment dan produk. Situs menampilkan "Hubungi klinik".
- Foto yang memperlihatkan wajah pasien dipakai hanya sebagai demo. Pastikan ada persetujuan sebelum publikasi.
- Domain final untuk canonical URL dan sitemap.

## Yang sengaja tidak dipakai
- Poster promo dengan harga lama (Rp41.000, Rp55.000, Rp99.000, dan lainnya), karena periode berlakunya tidak terverifikasi.
- Foto before-after pasien.
- Foto dengan teks promosi di atasnya sebagai foto utama.
- Tangkapan layar testimoni dan selfie pelanggan.
