import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "https://movies-bno4.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

async function getMovieLists() {
  try {
    const response = await api.get("/movies");
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getMovieReviews(movieId) {
  try {
    const response = await api.get(`/movies/${movieId}/reviews`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deleteMovieReview(reviewId) {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
async function updateMovieReview(movieId, reviewId, updatedReview) {
  try {
    const response = await api.put(
      `/movies/${movieId}/reviews/${reviewId}`,
      updatedReview
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
async function createMovieReview(movieId, reviewData) {
  try {
    const response = await api.post(`/movies/${movieId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
async function getUserMovieListById(listId) {
  try {
    const response = await api.get(`/user/lists/${listId}`); // Adjust the API endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
}

export {
  getMovieLists,
  getMovieReviews,
  deleteMovieReview,
  updateMovieReview,
  createMovieReview,
  getUserMovieListById,
};
