import { Link } from "react-router-dom";
import "./Courses.css";

const COURSES = [
  { slug: "artificial-intelligence", num: "01", title: "Artificial Intelligence", dept: "Information Systems · Electrical Engineering", icon: "/img/artificial-intelligence.png", desc: "Intelligent systems (searching, reasoning, learning, planning), AI/ML/LLM applications in enterprise, and AI history, theory & algorithms." },
  { slug: "business-model-canvas", num: "02", title: "Business Model Canvas and Communication for Social & SDGs", dept: "Business Administration · Communication Science", icon: "/img/package.png", desc: "Business model design for growth and competition, plus cross-cultural international communication in the digital era." },
  { slug: "data-analytics", num: "03", title: "Data Analytics", dept: "Industrial Engineering", icon: "/img/artificial-intelligence.png", desc: "Data analysis, visualization, and decision intelligence." },
  { slug: "data-security-blockchain", num: "04", title: "Data Security & Blockchain", dept: "Telecommunication Engineering", icon: "/img/cloud-server.png", desc: "Security fundamentals, cryptography, and blockchain systems." },
  { slug: "introduction-to-branding", num: "05", title: "Introduction to Branding", dept: "Visual Communication Design", icon: "/img/package.png", desc: "Brand elements, positioning, architecture, communication, and activation strategies." },
  { slug: "material-manufacturing", num: "06", title: "Material & Manufacturing Process", dept: "Industrial Engineering", icon: "/img/hierarchy.png", desc: "Materials engineering and modern manufacturing processes." },
  { slug: "strategic-management", num: "07", title: "Strategic Management", dept: "ICT Business · Accounting", icon: "/img/business.png", desc: "Strategic frameworks, environmental analysis, and sustainable business strategy (SDGs)." },
];

function Courses() {
  return (
    <section id="courses" className="courses-section">
      <div className="container">
        <div className="courses-header">
          <span className="section-label">Academic Program</span>
          <h2 className="section-title">Our <span>courses</span></h2>
          <p className="section-desc">Interdisciplinary courses taught by visiting international professors. Click any course to view its full schedule.</p>
        </div>

        <div className="courses-grid">
          {COURSES.map((c) => (
            <Link to={`/course/${c.slug}`} className="course-card" key={c.slug}>
              <div className="course-icon-wrap">
                <img src={c.icon} alt={c.title} loading="lazy" />
              </div>
              <div className="course-body">
                <h3 className="course-title">{c.title}</h3>
                <p className="course-dept">{c.dept}</p>
                <p className="course-desc">{c.desc}</p>
              </div>
              <span className="course-num">{c.num}</span>
              <div className="course-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
