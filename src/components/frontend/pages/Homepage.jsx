import React from "react";
import "../../../App.css"; // Corrected path to App.css

const Homepage = () => (
  <div className="home-page">
    <h2>Welcome to Travel App</h2>
    <p>Explore the best trips curated just for you. Start your journey now!</p>
    <img src="/images/travel.jpg" alt="Travel" className="hero-image" />
  </div>
);

export default Homepage;
