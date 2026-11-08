import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProgramBook from "./components/ProgramBook";
import { Speakers } from "./components/Speakers";
import Courses from "./components/Courses";
import { Gallery } from "./components/Gallery";
import Team from "./components/Team";
import { Contact } from "./components/Contact";
import CourseDetail from "./pages/CourseDetail";
import PartnersLogos from "./components/PartnersLogos";
import Footer from "./components/Footer";
import "./index.css";

const HomePage = () => (
  <>
    <Hero />
    <About />
    <ProgramBook />
    <Speakers />
    <Courses />
    <Gallery />
    <Team />
    <Contact />
    <PartnersLogos />
    <Footer />
  </>
);

// Scrolls to the #hash section after navigation (e.g. coming back from a course page)
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // wait for the target page to render, then scroll
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries < 20) {
          tries += 1;
          setTimeout(tryScroll, 60);
        }
      };
      setTimeout(tryScroll, 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

const App = () => (
  <Router>
    <Navbar />
    <ScrollToHash />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/course/:slug" element={<CourseDetail />} />
      {/* Merged into business-model-canvas — keep old links working */}
      <Route path="/course/communication-sdgs" element={<Navigate to="/course/business-model-canvas" replace />} />
    </Routes>
  </Router>
);

export default App;
