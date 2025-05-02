import { genreList } from "../utils/genreList";

const GenreSection = () => {
    return (
      <section className="py-26 px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-6 text-white">Genre Tersedia</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(genreList).map(([id, name]) => (
            <button
              key={id}
              className="px-4 py-2 text-white rounded-full text-sm border border-white shadow-sm transition duration-200"
            >
              {name}
            </button>
          ))}
        </div>
      </section>
    );
  };
  
  export default GenreSection;