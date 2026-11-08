import "./PartnersLogos.css";

const UNIVERSITY_LOGOS = [
  { src: "/img/partners/porto.png", alt: "University of Porto" },
  { src: "/img/partners/nus.png", alt: "National University of Singapore" },
  { src: "/img/partners/chitkara.png", alt: "Chitkara University" },
  { src: "/img/partners/zte.png", alt: "ZTE" },
  { src: "/img/partners/uitm.png", alt: "Universiti Teknologi MARA" },
  { src: "/img/partners/mmu.png", alt: "Multimedia University" },
  { src: "/img/partners/uthm.png", alt: "Universiti Tun Hussein Onn Malaysia" },
  { src: "/img/partners/umpsa.png", alt: "Universiti Malaysia Pahang Al-Sultan Abdullah" },
  { src: "/img/partners/utp.png", alt: "Universiti Teknologi PETRONAS" },
];

const SUPPORTED_BY = [
  { src: "/img/partners/supported-by/bpa.png", alt: "Bagian Pengembangan Akademik (BPA)", big: true },
  { src: "/img/partners/supported-by/asus.png", alt: "ASUS — Aset & Sustainability" },
  { src: "/img/partners/supported-by/puti.png", alt: "Direktorat Pusat Teknologi Informasi (PUTI)" },
  { src: "/img/partners/supported-by/celoe.png", alt: "CELOE — Center of eLearning & Open Education, Telkom University" },
];

const ORGANIZED_BY_HOSTS = [
  { src: "/img/partners/organized-by/ic-telkom.png", alt: "International Class, Telkom University" },
  { src: "/img/partners/organized-by/telkom-intl-office.png", alt: "Telkom University International Office" },
];

const ORGANIZED_BY_FACULTIES_ROW1 = [
  { src: "/img/partners/organized-by/fak-teknik-elektro.png", alt: "Fakultas Teknik Elektro" },
  { src: "/img/partners/organized-by/fak-informatika.png", alt: "Fakultas Informatika" },
  { src: "/img/partners/organized-by/fak-komunikasi.png", alt: "Fakultas Komunikasi & Ilmu Sosial" },
];

const ORGANIZED_BY_FACULTIES_ROW2 = [
  { src: "/img/partners/organized-by/fak-rekayasa-industri.png", alt: "Fakultas Rekayasa Industri" },
  { src: "/img/partners/organized-by/fak-ekonomi-bisnis.png", alt: "Fakultas Ekonomi & Bisnis" },
  { src: "/img/partners/organized-by/fak-industri-kreatif.png", alt: "Fakultas Industri Kreatif" },
];

function PartnersLogos() {
  return (
    <section id="partners" className="partners-section">
      <div className="container">
        <p className="partners-block-label">Organized By</p>
        <div className="organized-row organized-row--hosts">
          {ORGANIZED_BY_HOSTS.map((logo) => (
            <div className="organized-logo-card organized-logo-card--host" key={logo.src}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="organized-row organized-row--faculties">
          {ORGANIZED_BY_FACULTIES_ROW1.map((logo) => (
            <div className="organized-logo-card" key={logo.src}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="organized-row organized-row--faculties">
          {ORGANIZED_BY_FACULTIES_ROW2.map((logo) => (
            <div className="organized-logo-card" key={logo.src}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <p className="partners-block-label partners-block-label--spaced">Supported By</p>
        <div className="organized-row organized-row--supported">
          {SUPPORTED_BY.map((logo) => (
            <div className={`organized-logo-card ${logo.big ? "organized-logo-card--big" : ""}`} key={logo.src}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <p className="partners-block-label partners-block-label--spaced">University Partners</p>
        <div className="logo-grid logo-grid--unis">
          {UNIVERSITY_LOGOS.map((logo) => (
            <div className="logo-card" key={logo.src}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersLogos;
