import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Loader from "../Loader";
import "./CreateMovieList.css";

function CreateMovieList() {
  const [movieName, setMovieName] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedMovieList =
        JSON.parse(localStorage.getItem("movieList")) || [];
      setMovieList(storedMovieList);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleCreate = () => {
    if (movieName && movieDescription && movieRating) {
      const newMovie = {
        id: Date.now(),
        name: movieName,
        description: movieDescription,
        rating: movieRating,
      };
      const updatedMovieList = [...movieList, newMovie];
      setMovieList(updatedMovieList);

      localStorage.setItem("movieList", JSON.stringify(updatedMovieList));

      setMovieName("");
      setMovieDescription("");
      setMovieRating("");
    }
  };

  const handleDeleteMovie = (movieId) => {
    const updatedMovieList = movieList.filter((movie) => movie.id !== movieId);
    setMovieList(updatedMovieList);
    localStorage.setItem("movieList", JSON.stringify(updatedMovieList));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Welcome to Your Movie List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Description"
          value={movieDescription}
          onChange={(e) => setMovieDescription(e.target.value)}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Rating (1-10)"
          value={movieRating}
          onChange={(e) => setMovieRating(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={handleCreate}>
          Add Movie
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="movie-card-container">
          {movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDeleteMovie={() => handleDeleteMovie(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CreateMovieList;
