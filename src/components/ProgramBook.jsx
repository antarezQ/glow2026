import "./ProgramBook.css";

function ProgramBook() {
  return (
    <section id="programbook" className="programbook-section">
      <div className="container">
        <div className="pb-header">
          <span className="section-label">Program Guide</span>
          <h2 className="section-title">Official Program Book</h2>
          <p className="section-desc">
            Full schedule, speaker profiles, course details, and essential event information — all in one place.
          </p>
          <div className="pb-alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            All participants are required to read the Program Book before attending the event.
          </div>
        </div>

        <div className="pb-embed">
          <iframe
            title="GLOW 2026 Program Book"
            src="https://www.canva.com/design/DAHMKIiq-tA/IGspo9ZO5wjt6tOzQk-l0Q/view?embed"
            allowFullScreen
          />
          <a
            href="https://www.canva.com/design/DAHMKIiq-tA/MWApUod_P7if55NJXrS6oQ/view?utm_content=DAGpYLwbOlI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
            target="_blank"
            rel="noopener noreferrer"
            className="pb-download btn-primary"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Program Book
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProgramBook;
