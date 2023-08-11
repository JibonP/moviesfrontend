import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieReviews,
  deleteMovieReview,
  createMovieReview,
} from "../api/api";
import EditReviewForm from "./EditReviewForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

function MovieReviews() {
  const { movieId } = useParams();

  const [movieReviews, setMovieReviews] = useState([]);
  const [creatingReview, setCreatingReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [newReview, setNewReview] = useState({
    reviewer: "",
    title: "",
    content: "",
    rating: "0",
    movie_id: movieId,
  });

  const fetchMovieReviews = useCallback(async () => {
    try {
      const reviews = await getMovieReviews(movieId);
      setMovieReviews(reviews);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movie reviews:", error);
      setIsLoading(false);
    }
  }, [movieId]); // Include movieId as a dependency

  useEffect(() => {
    fetchMovieReviews();
  }, [fetchMovieReviews]);

  const handleCreateReview = async () => {
    try {
      await createMovieReview(movieId, newReview);
      fetchMovieReviews();
      setCreatingReview(false);
      setNewReview({
        reviewer: "",
        title: "",
        content: "",
        rating: "0",
        movie_id: movieId,
      });
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteMovieReview(reviewId);
      setMovieReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const [editReviewId, setEditReviewId] = useState(null);

  const handleEditReview = (reviewId) => {
    setEditReviewId(reviewId);
  };

  const handleCancelEdit = () => {
    setEditReviewId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Movie Reviews</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="list-group">
          {movieReviews.map((review) => (
            <li key={review.id} className="list-group-item">
              <div>
                <h4>{review.title}</h4>
                <p>Reviewer: {review.reviewer}</p>
                <p>{review.content}</p>
                <p>Rating: {review.rating}</p>
                {editReviewId === review.id ? (
                  <EditReviewForm
                    review={review}
                    onCancelEdit={handleCancelEdit}
                    onUpdate={() => {
                      fetchMovieReviews();
                      handleCancelEdit();
                    }}
                  />
                ) : (
                  <div className="d-flex">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditReview(review.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className="btn btn-success mt-3"
        onClick={() => setCreatingReview(true)}
      >
        <FontAwesomeIcon icon={faPlus} /> Create New Review
      </button>
      {creatingReview && (
        <EditReviewForm
          review={newReview}
          onCancelEdit={() => setCreatingReview(false)}
          onUpdate={handleCreateReview}
          isCreating={true}
        />
      )}
    </div>
  );
}

export default MovieReviews;
