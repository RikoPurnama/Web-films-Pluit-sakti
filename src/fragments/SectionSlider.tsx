import { MovieTypes } from "../types/MovieTypes";
import Card from "../components/Card";
import { Link } from "react-router";

interface SectionSliderProps {
  title: string;
  movies: MovieTypes[];
  linkTo: string;
  buttonColor?: string;
}

const SectionSlider = ({
  title,
  movies,
  linkTo,
  buttonColor = "bg-red-600",
}: SectionSliderProps) => {
  const limitedMovies = movies.slice(0, 6);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-20">
        {/* Header + Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          <Link
            to={linkTo}
            className={`${buttonColor} hidden lg:inline-block text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:opacity-90 transition`}
          >
            Lebih Banyak
          </Link>
        </div>

        {/* Movie List: flex on sm and md, grid only on lg+ */}
        <div className="flex gap-4 pb-5 overflow-x-auto lg:grid lg:grid-cols-6 xl:grid-cols-6 lg:overflow-visible snap-x snap-mandatory scrollbar-hide">
          {limitedMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[180px] sm:min-w-[200px] lg:min-w-0 snap-start"
            >
              <Card movie={movie} />
            </div>
          ))}

          {/* Card-style Button for Mobile & Tablet */}
          <div className="min-w-[180px] sm:min-w-[200px] lg:hidden snap-start">
            <Link
              to={linkTo}
              className=" bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg shadow-md h-full flex flex-col justify-center items-center py-8 px-4 transition"
            >
              <span className="text-xl font-semibold mb-2">Lebih Banyak</span>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSlider;
