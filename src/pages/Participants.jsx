import "./Participants.css";

function Participants() {
  return (
    <div className="part-page">
      <div className="part-hero">
        <div className="container">
          <a href="/" className="part-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
            Back to Home
          </a>
          <span className="section-label">GLOW 2026</span>
          <h1 className="section-title">List of Participants</h1>
          <p className="section-desc">All registered participants for GLOW 2026. Open the spreadsheet below for the full list.</p>
        </div>
      </div>

      <div className="container part-body">
        <div className="part-embed-wrap">
          <iframe
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQCFd_mKZWVQwIbIcclaI8PwDWgHrSfdFQ4Kv_zsxPs0WwOqHudg7le8QyZSniR4VsrI-AmKjWl-O6-/pubhtml"
            title="Participants Spreadsheet"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <a
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQCFd_mKZWVQwIbIcclaI8PwDWgHrSfdFQ4Kv_zsxPs0WwOqHudg7le8QyZSniR4VsrI-AmKjWl-O6-/pubhtml"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Open Full Spreadsheet
        </a>
      </div>
    </div>
  );
}

export default Participants;
