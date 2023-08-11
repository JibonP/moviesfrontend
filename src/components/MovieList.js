import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovieLists } from "../api/api";
import "./MovieList.css";
import Loader from "./Loader"; // Import the Loader component

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    fetchMovieList();
  }, []);

  async function fetchMovieList() {
    try {
      const movieList = await getMovieLists();
      setMovies(movieList);
      setIsLoading(false); // Set isLoading to false once data is fetched
    } catch (error) {
      console.error("Error fetching movie list:", error);
      setIsLoading(false); // Set isLoading to false in case of error
    }
  }

  const handleCardClick = (index) => {
    const updatedMovies = [...movies];
    updatedMovies[index].flipped = !updatedMovies[index].flipped;
    setMovies(updatedMovies);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Movie List</h2>
      {/* Conditional rendering based on isLoading state */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`col-lg-4 mb-4 ${movie.flipped ? "flipped" : ""}`}
            >
              <div
                className={`movie-card ${movie.flipped ? "flipped" : ""}`}
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`movie-card-inner ${
                    movie.flipped ? "flipped" : ""
                  }`}
                >
                  <div className="movie-card-front">
                    {/* <img
                      className="movie-image"
                      src={movie.image}
                      alt={`${movie.name} Poster`}
                    /> */}
                    <h3>{movie.name}</h3>
                    <p className="movie-year">{movie.year}</p>
                  </div>
                  <div className="movie-card-back">
                    <div className="movie-details-container">
                      <p className="movie-description">{movie.description}</p>
                      <p className="movie-details">
                        <strong>Rating:</strong> {movie.rating}
                      </p>
                      <Link
                        to={`/movies/${movie.id}/reviews`}
                        className="btn btn-primary"
                      >
                        View Reviews
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
