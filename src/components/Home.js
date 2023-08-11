import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="mb-4">Welcome to Movies App</h2>
              <p className="lead">
                Explore a world of movies with our Movies App. Discover the
                latest releases, find your favorite genres, and create your own
                movie lists. Whether you're a casual viewer or a devoted
                cinephile, Movies App has something for everyone.
              </p>
              <p className="text-muted">
                Get ready for an immersive movie experience like never before!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
