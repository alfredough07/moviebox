import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const MovieCard = ({ movie, isLiked, onToggleLike }) => {
  return (
    <div key={movie.id} className={`movie-card `}>
      {movie.posterPath || movie.poster_path ? (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${
              movie.poster_path || movie.posterPath
            }`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </>
      ) : (
        <>
          <p>No Movie Poster available</p>
          <h3>{movie.title}</h3>
        </>
      )}
      <button className="like-button" onClick={() => onToggleLike(movie)}>
        {isLiked ? (
          <AiFillHeart
            size={30}
            style={{ color: "#bb86fc", fill: "#bb86fc" }}
          />
        ) : (
          <AiOutlineHeart
            size={30}
            style={{ color: "#bb86fc", fill: "#bb86fc" }}
          />
        )}
      </button>
    </div>
  );
};

export default MovieCard;
