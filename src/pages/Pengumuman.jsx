import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./Pengumuman.css";

function Pengumuman() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "pengumuman"), orderBy("tanggal", "desc"));
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        const snap = await getDocs(collection(db, "pengumuman"));
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
      setLoading(false);
    })();
  }, []);

  const formatDate = (ts) => {
    if (!ts) return "";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  // Only show GLOW 2026 announcements here. GLOW 2025 lives on the old external site.
  // Items without an `edition` field are treated as 2026 (legacy).
  const visibleItems = items.filter((it) => (it.edition || "2026") === "2026");

  if (loading) return (
    <div className="pa-loading">
      <div className="pa-spinner" />
      <p>Loading announcements…</p>
    </div>
  );

  return (
    <div className="pa-page">
      <div className="pa-header">
        <div className="container">
          <a href="/" className="part-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
            Back to Home
          </a>
          <span className="section-label">ICAO · Telkom University</span>
          <h1 className="section-title">Announcements</h1>
          <p className="pa-subtitle">Latest news and updates for GLOW participants.</p>
        </div>
      </div>

      <div className="container pa-body">
        {visibleItems.length === 0 ? (
          <div className="pa-empty">
            <p>No announcements yet.</p>
          </div>
        ) : (
          <div className="pa-list">
            {visibleItems.map((item) => (
              <div className="pa-item" key={item.id}>
                <div className="pa-item-header">
                  <h3 className="pa-item-title">{item.judul}</h3>
                  {item.tanggal && <span className="pa-date">{formatDate(item.tanggal)}</span>}
                </div>
                <p className="pa-item-body">{item.isi}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="pa-link">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Open Link
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pengumuman;
