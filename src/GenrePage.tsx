import { useEffect, useState } from "react";
import { MovieTypes } from "./types/MovieTypes";
import { genreList } from "./utils/genreList";
import Card from "./components/Card";
import CardSekeleton from "./components/skeletons/CardSekeleton";

const GenrePage = () => {
  const [genreId, setGenreId] = useState<number>(28); // default Action
  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [visibleCount, setVisibleCount] = useState(18);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASEURL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchMoviesByGenre = async (genreId: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error("Gagal memuat data genre:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre(genreId);
  }, [genreId]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreId(Number(e.target.value));
    setVisibleCount(18);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 18);
  };

  const visibleMovies = movies.slice(0, visibleCount);

  return (
    <section className="py-20 px-4 md:px-20">
      <div className="flex gap-5 items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Genre:</h1>
        <div className="pt-2">
          <select
            className="w-auto text-white font-bold text-2xl outline-none cursor-pointer bg-transparent"
            value={genreId}
            onChange={handleGenreChange}
          >
            {Object.entries(genreList).map(([id, name]) => (
              <option key={id} value={id} className="bg-[#090617]">
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {loading
          ? Array.from({ length: visibleCount }).map((_, idx) => (
              <CardSekeleton key={idx} />
            ))
          : visibleMovies.map((movie) => <Card key={movie.id} movie={movie} />)}
      </div>

      {!loading && visibleCount < movies.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleShowMore}
            className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Lebih Banyak
          </button>
        </div>
      )}
    </section>
  );
};

export default GenrePage;
