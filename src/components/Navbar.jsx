import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "speakers", label: "Speakers" },
  { id: "courses", label: "Courses" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Our Team" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [show2024, setShow2024] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0);

      let current = "";
      document.querySelectorAll("section[id]").forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (!show2024) return;
    const onKey = (e) => { if (e.key === "Escape") setShow2024(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show2024]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="nav-inner container">
        <a href="/#hero" className="nav-logo">
          <img src="/logo.png" alt="Telkom University International Class" className="nav-logo-img" />
          <span className="nav-logo-divider" />
          <span className="nav-logo-badge">GLOW <strong>2026</strong></span>
        </a>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id} className={active === id ? "active" : ""}>
              <a href={`/#${id}`} onClick={() => setIsOpen(false)}>{label}</a>
            </li>
          ))}
          <li
            className="nav-archive-wrap"
            onMouseEnter={() => setArchiveOpen(true)}
            onMouseLeave={() => setArchiveOpen(false)}
          >
            <a
              href="/"
              className="nav-announce"
              onClick={() => setIsOpen(false)}
              aria-haspopup="true"
              aria-expanded={archiveOpen}
            >
              <span className="pulse-dot" />
              Archive
              <svg className="nav-caret" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </a>
            <div className={`nav-dropdown ${archiveOpen ? "show" : ""}`}>
              <a
                href="https://glowtelkomuniversity.org/2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-dd-item"
                onClick={() => { setIsOpen(false); setArchiveOpen(false); }}
              >
                <span className="nav-dd-title">
                  GLOW 2025
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ marginLeft: 5 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </span>
                <span className="nav-dd-sub">View 2025 website</span>
              </a>
              <button
                type="button"
                className="nav-dd-item nav-dd-item--btn"
                onClick={() => { setShow2024(true); setIsOpen(false); setArchiveOpen(false); }}
              >
                <span className="nav-dd-title">
                  GLOW 2024
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ marginLeft: 5 }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </span>
                <span className="nav-dd-sub">Watch the recap video</span>
              </button>
            </div>
          </li>
        </ul>

        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {show2024 && (
        <div className="nav-modal-overlay" onClick={() => setShow2024(false)}>
          <div className="nav-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nav-modal-head">
              <p className="nav-modal-title">GLOW 2024 Recap</p>
              <button type="button" className="nav-modal-close" onClick={() => setShow2024(false)} aria-label="Close">✕</button>
            </div>
            <div className="nav-modal-body">
              <iframe
                src="https://www.youtube.com/embed/nLMfotthGcw?si=JbLm2XZn8wmwgFQw"
                title="GLOW 2024 Recap Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="nav-modal-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
