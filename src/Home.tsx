import { Link } from "react-router";
import { MovieTypes } from "./types/MovieTypes";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { genreList } from "./utils/genreList";
import SectionSlider from "./fragments/SectionSlider";
import GenreSection from "./components/genreSection";
import { IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

interface HomeProps {
  topRated: MovieTypes[];
  popular: MovieTypes[];
  nowPlaying: MovieTypes[];
  upcoming: MovieTypes[];
}

interface Actor {
  name: string;
  character: string;
  profile_path: string;
}

const Home = ({ topRated, popular, nowPlaying, upcoming }: HomeProps) => {
  const baseImgUrl = import.meta.env.VITE_BASEIMGURL;
  const baseUrl = import.meta.env.VITE_BASEURL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [actorsMap, setActorsMap] = useState<Record<number, Actor[]>>({});

  useEffect(() => {
    const fetchAllActors = async () => {
      const newActorsMap: Record<number, Actor[]> = {};

      await Promise.all(
        topRated.map(async (movie) => {
          try {
            const res = await fetch(
              `${baseUrl}/movie/${movie.id}/credits?api_key=${apiKey}&language=en-US`
            );
            const data = await res.json();
            newActorsMap[movie.id] = data.cast || [];
          } catch (error) {
            console.error(`Gagal mengambil aktor untuk movie ${movie.id}`, error);
            newActorsMap[movie.id] = [];
          }
        })
      );

      setActorsMap(newActorsMap);
    };

    if (topRated.length > 0) {
      fetchAllActors();
    }
  }, [topRated]);

  return (
    <>
      <section className="flex justify-center bg-white">
        <Carousel
          className="z-30"
          showThumbs={false}
          autoPlay
          infiniteLoop
          transitionTime={3}
          showStatus={false}
          showIndicators={false}
        >
          {topRated.map((movie) => {
            const actors = actorsMap[movie.id] || [];

            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="relative bg-slate-100 before:content-[''] before:absolute before:top-0 before:-left-[100%] before:w-screen before:h-full before:bg-gradient-to-r before:from-[#090617] before:from-15% before:to-transparent before:z-10"
              >
                <div className="w-full h-lvh">
                  <img
                    src={`${baseImgUrl}original${movie.backdrop_path}`}
                    className="shadow-2xl w-full h-full object-cover object-top"
                    alt={movie.title}
                  />
                </div>
                <article className="absolute top-30 z-20 px-8 md:px-20 h-[27rem] w-screen">
                  <div className="relative">
                    <span className="text-xs md:text-sm text-white flex gap-1 flex-wrap">
                      {movie.genre_ids.map((id, i, arr) => (
                        <span key={id} className="flex items-center">
                          {genreList[id]}
                          {i < arr.length - 1 && (
                            <span className="mx-1 mb-1">
                              <span className="w-1 h-1 rounded-full bg-white inline-block" />
                            </span>
                          )}
                        </span>
                      ))}
                    </span>
                    <h3 className="max-w-6xl text-4xl md:text-6xl text-white font-bold text-left py-2">
                      {movie.title}
                    </h3>
                    <span className="absolute left-0 border border-white px-4 py-1.5 mt-2 text-xs text-white font-semibold rounded-full">
                      {movie.adult ? "18+" : "13+"}
                    </span>

                    <div className="flex items-center gap-1.5 text-white py-13 pb-14">
                      <span className="flex text-base md:text-xl font-semibold">
                        <span className="text-sm md:text-lg">⭐</span>
                        {movie.vote_average}
                      </span>
                      <p className="text-base md:text-lg font-semibold">
                        | {movie.release_date}
                      </p>
                    </div>

                    <p className="w-full md:max-w-1/2 text-xs md:text-base text-white text-left pb-9">
                      {movie.overview}
                    </p>

                    <p className="max-w-[60%] text-xs md:text-sm text-white text-left pb-2">
                      <span className="text-slate-300">Dibintangi:</span>{" "}
                      {actors.length > 0 ? (
                        actors.slice(0, 4).map((actor, i, arr) => (
                          <span key={i}>
                            {actor.name}
                            {i < arr.length - 1 && ", "}
                          </span>
                        ))
                      ) : (
                        <i>Belum tersedia</i>
                      )}
                    </p>

                    <div className="w-full flex justify-start mt-10">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="flex gap-1 items-center text-white w-auto py-3 px-5 bg-red-600 rounded-md"
                      >
                        <IoEyeOutline className="text-xl mt-0.5" />
                        Lihat Film
                      </Link>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </Carousel>
      </section>

      <SectionSlider title="Sedang Tayang" movies={nowPlaying} linkTo="/sedang-tayang" />
      <SectionSlider title="Terpopuler" movies={popular} linkTo="/popular" />
      <SectionSlider title="Mendatang" movies={upcoming} linkTo="/mendatang" />
      <GenreSection />
    </>
  );
};

export default Home;
