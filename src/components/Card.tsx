import { Link } from "react-router";

const Card = ({ movie }: any) => {
  return (
    <>
      <Link to={`movie/${movie.id}`} className="text-white">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-auto cursor-pointer"
        />
        <h2 className="text-base font-bold">{movie.title}</h2>
        <p className="text-xs md:text-base">{movie.release_date}</p>
      </Link>
    </>
  );
};

export default Card;
