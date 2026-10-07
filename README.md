# Website Spizartel dan Jajanku

Upload isi folder Web_jajanku ke document root hosting spizartel.biz.id (misalnya public_html).

- `/index.html`: katalog aplikasi Spizartel. Saat ini hanya menampilkan Jajanku.
- `/jajanku/index.html`: website Jajanku.
- `/jajanku/cara-pakai.html`, `/jajanku/privacy.html`, `/jajanku/hapus-akun.html`, `/jajanku/bantuan.html`: halaman pendukung Jajanku.

Preview: jalankan `python -m http.server 8080 --bind 127.0.0.1` dari folder ini. Buka http://localhost:8080/ dan http://localhost:8080/jajanku/.

Konfigurasi aktif Jajanku berada di `jajanku/assets/js/config.js`. Pengelola Spizartel dan email contact@spizartel.biz.id sudah dikonfigurasi. Lengkapi URL Google Play, estimasi penghapusan via email, serta screenshot asli sebelum publikasi. Formulir penghapusan membuka aplikasi email dan tidak mengirim permintaan ke server. Kebijakan privasi mengikuti assets/legal/privacy_policy.md di aplikasi Flutter.

Untuk menambah aplikasi: tambahkan kartu pada index.html dan tempatkan website aplikasi di subfolder sendiri. Halaman Jajanku lama di root dialihkan untuk mempertahankan tautan lama.

Kebijakan privasi diperbarui 7 Oktober 2026. URL resmi: https://spizartel.biz.id/jajanku/privacy (folder privacy/index.html).
