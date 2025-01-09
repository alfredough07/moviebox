import {
  doc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addLike = async (userId, movie) => {
  try {
    //Reference likes subcollection
    const userLikesRef = collection(db, "users", userId, "likes");
    //Add movies to likes subcollection
    await setDoc(doc(userLikesRef, movie.id.toString()), {
      title: movie.title,
      posterPath: movie.poster_path || movie.posterPath,
    });
    console.log(`Added ${movie.title} to likes!`);
  } catch (error) {
    console.error("Error adding like:", error);
  }
};

export const fetchLikes = async (userId) => {
  try {
    const userLikesRef = collection(db, "users", userId, "likes");
    const likesSnapshot = await getDocs(userLikesRef);
    //Map docs to data
    const likesMovies = likesSnapshot.docs.map((doc) => doc.data());

    //Debugging
    console.log(`Fetches liked movies ${likesMovies} for user ${userId}`);
    return likesMovies;
  } catch (error) {
    console.error("Error fetching likes:", error);
    return [];
  }
};

export const removeLike = async (userId, movieId) => {
  try {
    const userLikesRef = collection(db, "users", userId, "likes");
    await deleteDoc(doc(userLikesRef, movieId.toString()));
    console.log(`Removed like for movie ${movieId}`);
  } catch (error) {
    console.error("Error removing like:", error.message);
  }
};
