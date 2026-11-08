import { useState, useCallback, memo } from "react";
import "./Gallery.css";

const IMAGES = [
  "/img/gallery/galeri1.1.png", "/img/gallery/galeri2.1.png",
  "/img/gallery/galeri3.1.png", "/img/gallery/galeri4.1.png",
  "/img/gallery/galeri5.1.png", "/img/gallery/galeri6.1.png",
  "/img/gallery/galeri7.1.png", "/img/gallery/galeri8.1.png",
];

const GalleryImg = memo(({ src, index, onClick }) => (
  <button
    className="g-img-btn"
    onClick={() => onClick(src)}
    aria-label={`View image ${index + 1}`}
  >
    <img src={src} alt={`GLOW activity ${index + 1}`} loading="lazy" decoding="async" />
    <span className="g-overlay">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
    </span>
  </button>
));
GalleryImg.displayName = "GalleryImg";

export function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const open = useCallback((src) => { setLightbox(src); document.body.style.overflow = "hidden"; }, []);
  const close = useCallback(() => { setLightbox(null); document.body.style.overflow = ""; }, []);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="gallery-header">
          <div>
            <span className="section-label">Moments</span>
            <h2 className="section-title">Gallery</h2>
            <p className="section-desc">Snapshots from previous GLOW editions — classrooms, networking sessions, and cultural experiences.</p>
          </div>
        </div>

        <div className="gallery-grid">
          {IMAGES.map((src, i) => (
            <GalleryImg key={src} src={src} index={i} onClick={open} />
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={close} role="dialog" aria-label="Image preview">
          <button className="lb-close" onClick={close} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <img src={lightbox} alt="Gallery preview" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
