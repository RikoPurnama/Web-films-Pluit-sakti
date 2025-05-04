import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { genreList } from "./utils/genreList";
import Card from "./components/Card";
import { MovieTypes } from "./types/MovieTypes";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  original_language: string;
  genres: Genre[];
  adult: boolean;
}

interface Actor {
  name: string;
  character: string;
  profile_path: string;
}

interface Video {
  key: string;
  name: string;
}

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [actors, setActors] = useState<Actor[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [similarMovies, setSimilarMovies] = useState<MovieTypes[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const baseUrl = import.meta.env.VITE_BASEURL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieRes = await fetch(
        `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      const movieData = await movieRes.json();
      setMovie(movieData);

      const actorsRes = await fetch(
        `${baseUrl}/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      );
      const actorsData = await actorsRes.json();
      setActors(actorsData.cast || []);

      const videosRes = await fetch(
        `${baseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      const videosData = await videosRes.json();
      setVideos(videosData.results || []);

      const similarMoviesRes = await fetch(
        `${baseUrl}/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
      );
      const similarMoviesData = await similarMoviesRes.json();
      setSimilarMovies(similarMoviesData.results || []);
    };

    fetchMovieDetails();
  }, [id]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  return (
    <section className="w-full text-white">
      <div className="relative w-full h-screen overflow-hidden z-0 before:conten-[''] before:absolute before:top-0 before:w-screen before:h-full before:bg-gradient-to-r before:from-[#090617] before:from-15% before:to-transparent before:z-20  after:conten-[''] after:absolute after:top-0 after:w-screen after:h-full after:bg-gradient-to-t after:from-[#090617]/60 after:from-5% after:to-transparent after:z-20">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="relative top-1/5 md:top-1/3 flex items-center z-50">
          <div className="relative top-1/4 z-10 px-4 md:px-20 flex flex-col md:flex-row items-start gap-10">
            <div className="w-40 md:w-60 flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg"
              />
            </div>

            <div className="flex-1">
              <div className="flex gap-2 flex-wrap mb-2 text-sm text-slate-200">
                {movie.genres?.map((genre, i, arr) => (
                  <span key={genre.id} className="flex items-center uppercase">
                    {genreList[genre.id] || genre.name}
                    {i < arr.length - 1 && (
                      <span className="mx-1 mb-1">
                        <span className="w-1 h-1 rounded-full bg-white inline-block"></span>
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-4">{movie.title}</h1>

              <span className="border px-2 py-1.5 rounded-full text-xs">
                {movie.adult ? "18+" : "13+"}
              </span>
              <div className="flex items-center gap-3 text-sm md:text-base my-4">
                <span>⭐ {movie.vote_average}</span>
                <span>| {movie.release_date}</span>
                <span>| {movie.runtime} menit</span>
                <span>| {movie.original_language.toUpperCase()}</span>
              </div>

              <p className="text-sm md:text-base text-slate-100 mb-6 max-w-2xl leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20">
        <div className="my-6">
          <h3 className="text-3xl font-bold mb-6">Plot</h3>
          <p>{movie.overview}</p>
        </div>

        {videos.length > 0 && (
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Trailer</h2>
            <div className="flex justify-center mt-4">
              <iframe
                width="1160"
                height="512"
                src={`https://www.youtube.com/embed/${videos[0].key}`}
                title={videos[0].name}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {actors.length > 0 && (
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Dibintangi oleh</h2>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {actors.slice(0, 5).map((actor) => (
                <div key={actor.name} className="flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="rounded-lg mb-2"
                  />
                  <p>{actor.name}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Film Serupa */}
        {similarMovies.length > 0 && (
          <div className="mb-6">
            {visibleCount < similarMovies.length && (
              <div className="flex justify-between my-10">
                <h2 className="text-3xl font-bold">Film Serupa</h2>
                <button
                  onClick={handleShowMore}
                  className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Lebih Banyak {">"}
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarMovies.slice(0, visibleCount).map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailMovie;
