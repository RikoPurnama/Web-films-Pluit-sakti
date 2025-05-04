import { useState } from "react";
import { MovieTypes } from "./types/MovieTypes";
import Card from "./components/Card";

interface PopularProps {
  upcoming: MovieTypes[];
}

const Mendatang = ({ upcoming }: PopularProps) => {
  const [visibleCount, setVisibleCount] = useState(18);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 18);
  };

  const visibleMovies = upcoming.slice(0, visibleCount);

  return (
    <section className="py-20 px-4 md:px-20">
      <h1 className="text-3xl font-bold text-white mb-8">Mendatang</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {visibleMovies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>

      {visibleCount < upcoming.length && (
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

export default Mendatang;
