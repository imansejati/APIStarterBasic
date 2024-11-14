
## 1. Persiapan Awal

```markdown
1. Setup Environment
   - Install docker dan MySQL di komputer
   - Clone repository aplikasi
   - Buat database MySQL, import dbLatihan.sql 

2. Konfigurasi Aplikasi
   - buat file .env pada root directory
   - Isi konfigurasi database di file .env:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=your_database
     DB_HOST_PORT=3307
     DB_DOCKER_PORT=3306
     JWT_SECRET=your_secret_key
     NODE_HOST_PORT=3000
     NODE_DOCKER_PORT=3000

     ```

```

## 2. Menjalankan Aplikasi

```markdown
1. Start Docker
   - Buka terminal di folder aplikasi
   - Jalankan: `docker compose up --build`
   - Server akan berjalan di http://localhost:3000
   - Pastikan muncul pesan " API Server berjalan di http://localhost:3000"
```

## 3. Alur Penggunaan Aplikasi

### A. Registrasi User Baru
```markdown
1. Kirim POST request ke /api/auth/register
   - URL: http://localhost:3000/api/auth/register
   - Body (JSON):
     ```json
     {
         "name": "Nama Lengkap",
         "email": "email@example.com",
         "password": "password123"
     }
     ```
   - Simpan ID user yang didapat dari response
```

### B. Login User
```markdown
1. Kirim POST request ke /api/auth/login
   - URL: http://localhost:3000/api/auth/login
   - Body (JSON):
     ```json
     {
         "email": "email@example.com",
         "password": "password123"
     }
     ```
   - Simpan token JWT yang didapat dari response
```

### C. Menggunakan Fitur Utama
```markdown
1. Melihat Daftar User
   - Kirim GET request ke /api/users
   - Sertakan header: Authorization: Bearer <token>

2. Melihat Detail User
   - Kirim GET request ke /api/users/:id
   - Ganti :id dengan ID user yang ingin dilihat
   - Sertakan header: Authorization: Bearer <token>

3. Update Data User
   - Kirim PUT request ke /api/users/:id
   - Sertakan header: Authorization: Bearer <token>
   - Body (JSON):
     ```json
     {
         "name": "Nama Baru",
         "email": "email_baru@example.com"
     }
     ```

4. Hapus User
   - Kirim DELETE request ke /api/users/:id
   - Sertakan header: Authorization: Bearer <token>
```

### D. Logout
```markdown
1. Kirim POST request ke /api/auth/logout
   - Sertakan header: Authorization: Bearer <token>
   - Token akan diinvalidasi
```
