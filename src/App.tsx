import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Home from "./Home";
import "./App.css";
import SedangTayang from "./Sedang-Tayang";
import { MovieTypes } from "./types/MovieTypes";
import Popular from "./Popular";
import Mendatang from "./Mendatang";
import Footer from "./components/Footer";
import SearchPage from "./SearchPages";
import DetailMovie from "./Movie_Detail";
import GenrePage from "./GenrePage";
import CardSekeleton from "./components/skeletons/CardSekeleton";

function App() {
  const [topRated, setTopRated] = useState<MovieTypes[]>([]);
  const [popular, setPopular] = useState<MovieTypes[]>([]);
  const [nowPlaying, setNowPlaying] = useState<MovieTypes[]>([]);
  const [upcoming, setUpcoming] = useState<MovieTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASEURL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [topRatedRes, popularRes, nowPlayingRes, upcomingRes] =
          await Promise.all([
            fetch(`${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`),
            fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`),
            fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`),
            fetch(`${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`),
          ]);

        const [
          topRatedData,
          popularData,
          nowPlayingData,
          upcomingData,
        ] = await Promise.all([
          topRatedRes.json(),
          popularRes.json(),
          nowPlayingRes.json(),
          upcomingRes.json(),
        ]);

        setTopRated(topRatedData.results);
        setPopular(popularData.results);
        setNowPlaying(nowPlayingData.results);
        setUpcoming(upcomingData.results);
      } catch (err) {
        console.error("Gagal memuat data film:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090617] text-white py-20 px-4 md:px-20">
        <h1 className="text-3xl font-bold mb-6">Memuat data film...</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <CardSekeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              topRated={topRated}
              popular={popular}
              nowPlaying={nowPlaying}
              upcoming={upcoming}
            />
          }
        />
        <Route path="/sedang-tayang" element={<SedangTayang nowPlaying={nowPlaying} />} />
        <Route path="/popular" element={<Popular popular={popular} />} />
        <Route path="/mendatang" element={<Mendatang upcoming={upcoming} />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/movie/:id" element={<DetailMovie />} />
        <Route path="/sedang-tayang/movie/:id" element={<DetailMovie />} />
        <Route path="/popular/movie/:id" element={<DetailMovie />} />
        <Route path="/mendatang/movie/:id" element={<DetailMovie />} />
        <Route path="/genre/movie/:id" element={<DetailMovie />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
