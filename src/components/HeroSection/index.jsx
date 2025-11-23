import React from "react";
import "./HeroSection.css";

const HeroSection = () => (
  <section className="hero">
    <h1>🎈 You're Invited! 🎈</h1>
    <h2>
      Join us for <span className="hero-name">Abdoul’s Surprise Birthday Party!</span>
    </h2>
    <p className="hero-details">
      📅 November 30, 2025 • 🕒 5:30 PM – 8:30 PM
    </p>
    <p className="hero-location">
  <a
    href="https://maps.google.com/?q=PB+Brasserie+NYC"
    target="_blank"
    rel="noopener noreferrer"
  >
    📍 PB BRASSERIE — 60 West 125th Street, New York, NY 10027
  </a>
</p>


  </section>
);

export default HeroSection;
