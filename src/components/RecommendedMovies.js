import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

function RecommendedMovies() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("action");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.API_KEY || "e0b1d970";

  const fetchRecommendedMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${selectedGenre}`
      );

      if (response.data.Search) {
        const movieList = response.data.Search.slice(0, 5);
        const detailedMovieList = await Promise.all(
          movieList.map(async (movie) => {
            const detailedResponse = await axios.get(
              `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
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
    setIsLoading(false);
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
        </select>
        <button
          onClick={fetchRecommendedMovies}
          className="btn btn-primary ms-2"
        >
          Lets Go
        </button>
      </div>
      <ul className="list-group">
        {isLoading ? (
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
