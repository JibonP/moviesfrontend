import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";
import "./MovieCard.css";

function MovieCard({ movie, onDeleteMovie }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDeleteClick = () => {
    onDeleteMovie(movie.id);
  };

  return (
    <div className="card movie-card">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card-body">
          <h5 className="card-title">{movie.name}</h5>
          <p className="card-text">{movie.description}</p>
          <p className="card-text">Rating: {movie.rating}</p>
          <button className="btn btn-danger ml-2" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
