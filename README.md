# 🎬 Movie App (TMDB API) — React + TypeScript

Proyek ini adalah website katalog film yang menampilkan data dari [TMDB (The Movie Database)](https://www.themoviedb.org/). Dikarenakan dibatasi wakti jadi website ini dibangun menggunakan React + TypeScript, TailwindCSS, dan API TMDB.

---

## 📦 Tech Stack

- React + Vite
- TypeScript
- TailwindCSS
- React Router DOM
- TMDB API

---

## ⚙️ Setup Project

### 1. Inisialisasi Proyek

```bash
npm create vite@latest movie-app -- --template react-ts
cd movie-app
npm install


2. Install Dependency
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

3. Setup Tailwind
Edit tailwind.config.cjs:
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]

Tambahkan ke src/index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

🔑 Setup Environment
Buat file .env:
>VITE_API_KEY=your_tmdb_api_key
>VITE_BASEURL=https://api.themoviedb.org/3

🧱 Struktur Proyek
src/
├── components/
├── ├── Home.tsx
│   ├── Sedang-Tayang.tsx
│   ├── Popular.tsx
│   ├── Mendatang.tsx
│   ├── SearchPages.tsx
│   ├── Detail_Movie.tsx
│   ├── GenrePage.tsx
│   └── Skeletons/
│       └── CardSkeleton.tsx
├── utils/
│   ├── genreList.ts
│   └── useMediaQuery.tsx
├── fragments/
│   └── SectionSlider.tsx
├── types/
│   └── MovieTypes.ts
├── App.tsx
├── main.tsx
🚀 Fitur yang Dibuat
✅ Halaman Beranda (/)
Menampilkan list film dari endpoint: /movie/popular

Implementasi search dengan endpoint: /search/movie

Klik card film akan diarahkan ke detail

✅ Halaman Detail (/movie/:id)
Data dari endpoint: /movie/{id}

Menampilkan:

- Poster & title

- Genre (mapping dengan genreList.ts)

- Overview, rating, release date, runtime

- Label usia

Rencana tambahan:

- Trailer video (/movie/{id}/videos)

- Pemeran utama (/movie/{id}/credits)

- Film serupa (/movie/{id}/similar)

🧠 Notes
genreList.ts digunakan untuk mencocokkan genre ID dengan nama genre.

Tambahkan handling error untuk data yang belum tersedia.

Gunakan fallback pada gambar/poster jika poster_path kosong.

📌 TODO
 - Tambah fitur trailer

 - Tampilkan pemeran utama

 - Daftar film serupa

 - Responsif untuk mobile

🧑‍💻 Author
Riko Purnama
LinkedIn • https://www.linkedin/in/RikoPurnama
---