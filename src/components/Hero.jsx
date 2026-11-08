import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "country-list";
import "./Hero.css";

const TARGET_DATE = new Date("2026-07-06T00:00:00");

function calcTimeLeft() {
  const diff = TARGET_DATE - new Date();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const COUNTRIES = getData()
  .filter((c) => c.code !== "IL")
  .sort((a, b) => a.name.localeCompare(b.name));

const STATS = [
  { num: "1,500+", label: "International Students" },
  { num: "9", label: "Partner Universities" },
  { num: "5", label: "Countries" },
  { num: "9", label: "Courses" },
];

function Hero() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleParticipants = useCallback(() => navigate("/participants"), [navigate]);

  return (
    <section className="hero" id="hero">
      {/* Flag marquee */}
      <div className="flag-strip" aria-hidden="true">
        <div className="flag-track">
          {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
            <img
              key={i}
              src={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png`}
              alt={c.name}
              className="flag-img"
              loading="lazy"
              width="48"
              height="32"
            />
          ))}
        </div>
      </div>

      <div className="hero-bg-grid" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-left">
          <div className="hero-tag">Global Learning Week 2026</div>
          <h1 className="hero-title">
            Where the world <span className="hero-accent">learns</span> together
          </h1>
          <p className="hero-sub">
            6 – 17 July 2026 · Telkom University, Bandung<br />
            Earn credits. Learn from professors worldwide.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={handleParticipants}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Participants List
            </button>
            <a href="#about" className="btn-outline">Learn More</a>
          </div>

          {timeLeft ? (
            <div className="countdown">
              <p className="countdown-label">Event starts in</p>
              <div className="countdown-grid">
                {Object.entries(timeLeft).map(([unit, val]) => (
                  <div className="cd-box" key={unit}>
                    <span className="cd-num">{String(val).padStart(2, "0")}</span>
                    <span className="cd-unit">{unit}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="countdown">
              <p className="countdown-label" style={{ color: "var(--teal)" }}>Event is live!</p>
            </div>
          )}
        </div>

        <div className="hero-right">
          {/* Announcement bell — aligned directly above the video */}
          <button className="bell-btn" onClick={() => navigate("/pengumuman")} aria-label="View announcements">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="bell-dot" />
            <span>Announcement</span>
          </button>

          <div className="video-frame">
            <div className="video-label">Official Profile Video</div>
            <iframe
              src="https://www.youtube.com/embed/jpxUJNG9w5g"
              title="GLOW 2026 Profile Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="hero-stats" aria-label="Key numbers">
            {STATS.map(({ num, label }) => (
              <div className="stat-chip" key={label}>
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
