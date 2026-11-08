import "./Team.css";

function Team() {
  return (
    <section id="team" className="team-section">
      <div className="container">
        <span className="section-label">People Behind GLOW</span>
        <h2 className="section-title">GLOW Team</h2>
        <p className="section-desc">The dedicated coordinators and staff who make Global Learning Week possible.</p>
        <div className="team-img-wrap">
          <img src="/img/Team GLOW 2026.png" alt="GLOW 2026 organizing team" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export default Team;
