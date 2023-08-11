import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import MovieList from "./components/MovieList";
import MovieReviews from "./components/MovieReviews";
import CreateMovieList from "./components/createlist/CreateMovieList";
import RecommendedMovies from "./components/RecommendedMovies";
import About from "./components/About";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          <Route path="/recommended-movies" element={<RecommendedMovies />} />
          <Route path="/create-movie-list" element={<CreateMovieList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
