// pages/SearchPage.tsx
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        setError("Gagal mengambil data. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, apiKey]);

  return (
    <div className="min-h-screen pt-32 px-6 md:px-20 bg-[#0e0c1b] text-white">
      <h1 className="text-2xl font-bold mb-4">
        Hasil pencarian untuk: <span className="text-red-400">"{query}"</span>
      </h1>

      {loading && <p className="text-gray-400">Memuat...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {results.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <li className="bg-[#1a172b] rounded shadow overflow-hidden hover:scale-105 transition duration-200 cursor-pointer">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/no-image.jpg"
                  }
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-2">
                  <h2 className="text-base font-semibold">{movie.title}</h2>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-400">Tidak ditemukan hasil.</p>
      )}
    </div>
  );
};

export default SearchPage;
