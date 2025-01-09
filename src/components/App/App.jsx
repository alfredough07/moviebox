import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import MovieList from "../MovieList/MovieList";
import Likes from "../Likes/Likes";
import { logOut } from "../../firebase/authFunctions";

const App = () => {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);
  const handleLogout = async () => {
    await logOut();
    setUser(null);
    setLikes([]);
  };

  return (
    <BrowserRouter>
      <div>
        {user ? (
          <>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
              <Route
                path="/"
                element={
                  <MovieList user={user} setLikes={setLikes} likes={likes} />
                }
              />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route
                path="/likes"
                element={
                  <Likes user={user} setLikes={setLikes} likes={likes} />
                }
              />
            </Routes>
          </>
        ) : (
          <Login onLogin={(user) => setUser(user)} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
