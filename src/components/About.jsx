import "./About.css";

// Partner universities — ordered to match the international speakers, 3 rows of 3
const UNIVERSITIES = [
  { name: "Polytechnic Institute of Porto", country: "Portugal", flag: "pt" },
  { name: "National University of Singapore", country: "Singapore", flag: "sg" },
  { name: "Chitkara University", country: "India", flag: "in" },
  { name: "ZTE", country: "China", flag: "cn" },
  { name: "Universiti Teknologi MARA", country: "Malaysia", flag: "my" },
  { name: "Multimedia University", country: "Malaysia", flag: "my" },
  { name: "Universiti Tun Hussein Onn Malaysia", country: "Malaysia", flag: "my" },
  { name: "Universiti Malaysia Pahang Al-Sultan Abdullah", country: "Malaysia", flag: "my" },
  { name: "Universiti Teknologi PETRONAS", country: "Malaysia", flag: "my" },
];

const HIGHLIGHTS = [
  {
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 0 1 .665 6.479A11.952 11.952 0 0 0 12 20.055a11.952 11.952 0 0 0-6.824-2.998 12.078 12.078 0 0 1 .665-6.479L12 14z",
    title: "Overview",
    text: "A two-week credit-earning program at Telkom University, with departments offering courses to enhance students' academic skills.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Academic Exposure",
    text: "Students are introduced to recent technology innovations, their societal impacts, technopreneurship, and academic insights across fields.",
  },
  {
    icon: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M3.6 9h16.8 M3.6 15h16.8 M12 3a15 15 0 0 1 0 18 M12 3a15 15 0 0 0 0 18",
    title: "International Collaboration",
    text: "Enriches the international academic atmosphere and teaching quality, opening paths to dual/joint degrees, research collaborations, and other initiatives.",
  },
];

const FACTS = [
  { num: "9", label: "Courses available" },
  { num: "9", label: "Visiting professors" },
  { num: "347", label: "Participants" },
  { num: "18", label: "Co-lecturers" },
];

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-head">
          <span className="section-label">About the program</span>
          <h2 className="section-title">About <span>GLOW 2026</span></h2>
          <p className="section-desc">
            Global Learning Week is open for international class students. This year, GLOW runs fully onsite from <strong>6–17 July 2026</strong>, with classes on the 2nd, 3rd, 8th, and 9th floors of the Tokong Nanas Building, Telkom University.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-highlights">
            {HIGHLIGHTS.map((h) => (
              <div className="highlight-card" key={h.title}>
                <div className="highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={h.icon} />
                  </svg>
                </div>
                <h3 className="highlight-title">{h.title}</h3>
                <p className="highlight-text">{h.text}</p>
              </div>
            ))}
          </div>

          <div className="about-side">
            <div className="about-img-wrap">
              <img src="/img/GLOW 2026.png" alt="Students at GLOW" className="about-img" loading="lazy" />
            </div>
            <div className="facts-grid">
              {FACTS.map((f) => (
                <div className="fact-card" key={f.label}>
                  <span className="fact-num">{f.num}</span>
                  <span className="fact-label">{f.label}</span>
                </div>
              ))}
            </div>
            <div className="about-during">
              <p className="about-during-title">During the program, students will:</p>
              <ul>
                <li>Earn 2–4 academic credits</li>
                <li>Join studies and discussions with international lecturers</li>
                <li>Attend onsite classes at the Tokong Nanas Building</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="partner-section">
          <p className="partner-label">Partner universities joining GLOW 2026</p>
          <div className="partner-grid">
            {UNIVERSITIES.map(({ name, country, flag }) => (
              <div className="partner-card" key={name}>
                <img src={`https://flagcdn.com/w40/${flag}.png`} alt={country} className="partner-flag" loading="lazy" />
                <div>
                  <p className="partner-name">{name}</p>
                  <p className="partner-country">{country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
