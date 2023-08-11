import React, { useState, useEffect } from "react";
import { updateMovieReview, createMovieReview } from "../api/api";
import Loader from "./Loader"; // Import the Loader component

function EditReviewForm({ review, onCancelEdit, onUpdate, isCreating }) {
  const [editedReview, setEditedReview] = useState({
    reviewer: "",
    title: "",
    content: "",
    rating: "0",
    movie_id: review.movie_id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Add isSubmitting state

  useEffect(() => {
    if (!isCreating) {
      setEditedReview(review);
    }
  }, [review, isCreating]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Start submitting

    try {
      if (isCreating) {
        await handleCreateReview();
      } else {
        await updateMovieReview(review.movie_id, review.id, editedReview);
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating/creating review:", error);
    }

    setIsSubmitting(false); // Stop submitting
  };

  const handleCreateReview = async () => {
    try {
      await createMovieReview(review.movie_id, editedReview);
      onUpdate();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="reviewer" className="form-label">
          Reviewer
        </label>
        <input
          type="text"
          name="reviewer"
          value={editedReview.reviewer}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={editedReview.title}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          name="content"
          value={editedReview.content}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <input
          type="number"
          name="rating"
          value={editedReview.rating}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">
        {isCreating ? "Create" : "Save Changes"}
      </button>
      <button onClick={onCancelEdit} className="btn btn-secondary">
        Cancel
      </button>
      {isSubmitting && <Loader />} {/* Display loader during submission */}
    </form>
  );
}

export default EditReviewForm;
