import React, { useState, useEffect } from "react";
import jibonPic from "./assets/Jibon.jpg";
import aundale from "./assets/Aundale.jpg";
import Loader from "./Loader"; // Import the Loader component

import "./About.css";
import teamIcon from "./assets/pursuit2.png";

function PersonCard({ name, image, email, skillset, bio, githubLink }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`person-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img className="person-image" src={image} alt={name} />
          <h2>{name}</h2>
          <p className="person-title">
            <a href={githubLink} target="link" rel="link">
              Pursuit Fellow 9.5
            </a>
          </p>
        </div>
        <div className="flip-card-back">
          <div className="card-content">
            <h3>{name}</h3>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p className="person-skillset">
              <strong>Skillset:</strong> {skillset}
            </p>
          </div>
          <p className="person-bio">{bio}</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="about-page">
      <h1>Creators</h1>
      {isLoading ? ( // Conditional rendering based on isLoading state
        <Loader />
      ) : (
        <div className="person-cards">
          <PersonCard
            name="Jibon"
            image={jibonPic}
            email="jibonpaul@gmail.com"
            skillset={"JS, CSS, JavaScript, React, and others"}
            bio="Jibon is a passionate developer with expertise in frontend technologies."
            githubLink="https://github.com/JibonP"
          />
          <PersonCard
            name="Aundale"
            image={aundale}
            email="aundalewalker@pursuit.org"
            skillset={"JS, CSS, JavaScript, React, and others"}
            bio="Devin is a skilled designer with a keen eye for aesthetics."
            githubLink="https://github.com/devinjlewis"
          />
        </div>
      )}
      {!isLoading && (
        <div className="project-summary">
          <h2>About the Movie App</h2>
          <p>
            The Movie App is a result of our team's dedication and skills in web
            development. We've brought together our expertise in frontend
            technologies to create an immersive movie experience. Explore and
            discover a world of movies, add your favorites to your list, and get
            personalized recommendations based on genres. Join us on this
            cinematic journey!
          </p>

          <a
            href="https://www.pursuit.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={teamIcon} alt="Team Icon" className="team-icon" />
            <p>Start your dream today</p>
          </a>
        </div>
      )}
    </div>
  );
}

export default About;
