import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import "./Speakers.css";

const SPEAKERS = [
  { name: "Prof. Raquel Simões de Almeida", affiliation: "Polytechnic Institute of Porto", country: "Portugal", flag: "pt", image: "/img/speakers/raquel.png" },
  { name: "Prof. Robert De Souza", affiliation: "National University of Singapore", country: "Singapore", flag: "sg", image: "/img/speakers/robert.png" },
  { name: "Prof. Dr. Naveen Kumar", affiliation: "Chitkara University", country: "India", flag: "in", image: "/img/speakers/naveen.png" },
  { name: "Ma Jianmin", affiliation: "ZTE", country: "China", flag: "cn", image: "/img/speakers/jianmin.png" },
  { name: "Dr. Nurbaity Binti Sabri", affiliation: "Universiti Teknologi MARA", country: "Malaysia", flag: "my", image: "/img/speakers/nurbaity.png" },
  { name: "Prof. Ts. Dr. Ruslan Abdul Rahim", affiliation: "Multimedia University", country: "Malaysia", flag: "my", image: "/img/speakers/ruslan.png" },
  { name: "Prof. Madya Ts. Dr. Mohd Rasidi Bin Ibrahim", affiliation: "Universiti Tun Hussein Onn Malaysia", country: "Malaysia", flag: "my", image: "/img/speakers/rasidi.png" },
  { name: "Ts. Dr. Muhammad Ashraf Bin Fauri", affiliation: "Universiti Malaysia Pahang Al-Sultan Abdullah", country: "Malaysia", flag: "my", image: "/img/speakers/ashraf.png" },
  { name: "Ts. Dr. Khairul Shafee bin Kalid", affiliation: "Universiti Teknologi PETRONAS", country: "Malaysia", flag: "my", image: "/img/speakers/khairul.png" },
];

const CO_LECTURERS = [
  { name: "Dr.Eng. Favian Dewanta, S.T., M.Eng.", affiliation: "Telecommunication Engineering" },
  { name: "Dr.Eng. Danu Dwi Sanjoyo, S.T., M.T.", affiliation: "Telecommunication Engineering" },
  { name: "Dr. Marza Ihsan Marzuki, S.T., M.T.", affiliation: "Electrical Engineering" },
  { name: "Taufik Nur Adi, S.Kom., M.T., Ph.D.", affiliation: "Information System" },
  { name: "Nur Ichsan Utama, S.T., M.T., Ph.D.", affiliation: "Information System" },
  { name: "Iqbal Yulizar Mukti, S.Si., M.T., Ph.D.", affiliation: "Information System" },
  { name: "Safara Cathasa R.R., S.T., M.T.", affiliation: "Information System" },
  { name: "Teddy Sjafrizal, B.Eng (Hons), M.Sc., Ph.D.", affiliation: "Industrial Engineering" },
  { name: "Dr. Mohammad Deni Akbar, S.T., M.Math", affiliation: "Industrial Engineering" },
  { name: "Dr. Aditya Firman Ihsan, S.Si., M.Si.", affiliation: "Informatics" },
  { name: "Achmad Lukman, S.T., M.Cs., Ph.D.", affiliation: "Information Technology" },
  { name: "Dr. Sunu Puguh Hayu Triono, S.T., M.M.", affiliation: "ICT Business" },
  { name: "Assoc. Prof. Siska Noviaristanti, M.T., Ph.D.", affiliation: "ICT Business" },
  { name: "Dr. Hilda Salman Said, S.E., M.Si., Ak., CA., CPA.", affiliation: "Accounting" },
  { name: "Ihsan Hadiansah, S.E., M.S.M.", affiliation: "Business Administration" },
  { name: "Fikri Mohamad Rizaldi, B.B.A., M.A.B.", affiliation: "Business Administration" },
  { name: "Astaria Eka Santi, M.A.", affiliation: "Communication Science" },
  { name: "Dr. Maria Josef Retno Budi Wahyuni, M.Ds", affiliation: "Visual Communication Design" },
];

function initials(name) {
  const clean = name.replace(/\b(Dr|Prof|Madya|Ts|Assoc|S\.?T|M\.?T|M\.?M|Ph\.?D|S\.?E|M\.?Si|S\.?Kom|S\.?Si|B\.?A|M\.?Ds|B\.?Eng|Hons|M\.?Eng|M\.?Cs|M\.?S\.?M|Ak|CA|CPA|M\.?Math|Eng)\b\.?/gi, "")
    .replace(/[.,()]/g, " ").trim().split(/\s+/).filter(Boolean);
  return (clean[0]?.[0] || "") + (clean[1]?.[0] || "");
}

const SpeakerCard = memo(({ person, index }) => (
  <motion.div
    className="spk-card"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
  >
    <div className="spk-img-wrap">
      <img src={person.image} alt={person.name} loading="lazy" decoding="async" />
    </div>
    <div className="spk-info">
      <p className="spk-name">{person.name}</p>
      <p className="spk-affil">{person.affiliation}</p>
      <span className="spk-country">
        <img src={`https://flagcdn.com/w20/${person.flag}.png`} alt="" aria-hidden="true" />
        {person.country}
      </span>
    </div>
  </motion.div>
));
SpeakerCard.displayName = "SpeakerCard";

const CoCard = memo(({ person, index }) => (
  <motion.div
    className="co-card"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.35, delay: (index % 6) * 0.04, ease: "easeOut" }}
  >
    <span className="co-avatar">{initials(person.name)}</span>
    <div className="co-info">
      <p className="co-name">{person.name}</p>
      <p className="co-affil">{person.affiliation}</p>
    </div>
  </motion.div>
));
CoCard.displayName = "CoCard";

export function Speakers() {
  const speakerCards = useMemo(() => SPEAKERS.map((p, i) => <SpeakerCard key={p.name} person={p} index={i} />), []);
  const coCards = useMemo(() => CO_LECTURERS.map((p, i) => <CoCard key={p.name} person={p} index={i} />), []);

  return (
    <section id="speakers" className="speakers-section">
      <div className="container">
        <div className="spk-header">
          <span className="section-label">Speakers</span>
          <h2 className="section-title">International <span>speakers</span></h2>
          <p className="section-desc">Professors from partner universities worldwide, collaborating with Telkom University faculty.</p>
        </div>

        <div className="spk-grid">{speakerCards}</div>

        <div className="co-group">
          <h3 className="co-group-title">Co-Lecturers — Telkom University</h3>
          <div className="co-grid">{coCards}</div>
        </div>
      </div>
    </section>
  );
}
