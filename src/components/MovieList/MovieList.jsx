import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";
import {
  fetchLikes,
  removeLike,
  addLike,
} from "../../firebase/firestoreFunctions";

const MovieList = ({ user, likes, setLikes }) => {
  const [movies, setMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }

        const data = await response.json();
        setMovies(data.results); // Save movies to state
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies(); // Call the fetch function on component mount
  }, [API_KEY]);

  //Check like
  const isLiked = (movieId) => likes.some((movie) => movie.id === movieId);

  //Toggle like
  const handleToggleLike = async (movie) => {
    // If liked, remove from likes
    try {
      if (isLiked(movie.id)) {
        await removeLike(user.uid, movie.id);
        setLikes(likes.filter((m) => m.id !== movie.id));
      }
      //If not liked, add to likes
      else {
        await addLike(user.uid, movie);
        setLikes([...likes, movie]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  return (
    <div>
      <h2 className="popular-movies">Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isLiked={isLiked(movie.id)}
            onToggleLike={(movie) => handleToggleLike(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
