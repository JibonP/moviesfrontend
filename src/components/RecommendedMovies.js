import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader"; // Import the Loader component

function RecommendedMovies() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("action");
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const apiKey = "e0b1d970";

  const fetchRecommendedMovies = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${selectedGenre}`
      );

      if (response.data.Search) {
        const movieList = response.data.Search.slice(0, 5);
        const detailedMovieList = await Promise.all(
          movieList.map(async (movie) => {
            const detailedResponse = await axios.get(
              `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
            );
            return detailedResponse.data;
          })
        );

        setRecommendedMovies(detailedMovieList);
      } else {
        setRecommendedMovies([]);
      }
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    }
    setIsLoading(false); // Stop loading
  };

  const handleGenreChange = async (event) => {
    setSelectedGenre(event.target.value);
    await fetchRecommendedMovies();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Recommended Movies</h2>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <label htmlFor="genreSelect" className="me-2">
          Select Genre:
        </label>
        <select
          id="genreSelect"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="form-select"
        >
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          {/* Add more genre options */}
        </select>
        <button
          onClick={fetchRecommendedMovies}
          className="btn btn-primary ms-2"
        >
          Lets Go
        </button>
      </div>
      <ul className="list-group">
        {isLoading ? ( // Display loader while isLoading is true
          <Loader />
        ) : (
          recommendedMovies.map((movie) => (
            <li key={movie.imdbID} className="list-group-item">
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              {movie.Plot && <p>Plot: {movie.Plot}</p>}
              {movie.Poster && (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="img-fluid"
                />
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default RecommendedMovies;
