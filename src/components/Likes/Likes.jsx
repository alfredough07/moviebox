import React, { useEffect } from "react";
import {
  fetchLikes,
  removeLike,
  addLike,
} from "../../firebase/firestoreFunctions";

import MovieCard from "../MovieCard/MovieCard";
import "./Likes.css";

const Likes = ({ user, likes, setLikes }) => {
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
  //Check like
  const isLiked = (movieId) => likes.some((movie) => movie.id === movieId);

  //Fetch and display user likes

  useEffect(() => {
    const loadLikes = async () => {
      if (!user || likes.length > 0) return; //If no user or likes already loaded, return
      const userLikes = await fetchLikes(user.uid);
      setLikes(userLikes);
    };
    loadLikes();
  }, [user, setLikes]);
  return (
    <div className="likes-container">
      <h1>Your Liked Movies</h1>
      <div className="likes-grid movie-grid">
        {likes.map((movie) => (
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

export default Likes;
