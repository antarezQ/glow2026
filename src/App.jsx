import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";

const HomePage = () => (
  <>
    <main />
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
    <ScrollToHash />
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
