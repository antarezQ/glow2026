import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import "./Pengumuman.css";
import "./Login.css";

const EDITIONS = [
  { id: "2026", label: "GLOW 2026" },
  { id: "2025", label: "GLOW 2025" },
];

function AdminAnnounce() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  // management
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ judul: "", isi: "", link: "", edition: "2026" });
  const [editId, setEditId] = useState(null);
  const [activeEdition, setActiveEdition] = useState("2026");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
      if (u) fetchData();
    });
    return () => unsub();
  }, []);

  const fetchData = async () => {
    try {
      const q = query(collection(db, "pengumuman"), orderBy("tanggal", "desc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, "pengumuman"));
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setSigningIn(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (editId) {
      await updateDoc(doc(db, "pengumuman", editId), form);
      setEditId(null);
    } else {
      await addDoc(collection(db, "pengumuman"), { ...form, tanggal: new Date() });
    }
    setForm({ judul: "", isi: "", link: "", edition: activeEdition });
    fetchData();
  };

  const handleEdit = (item) => {
    setForm({ judul: item.judul, isi: item.isi, link: item.link || "", edition: item.edition || "2026" });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    await deleteDoc(doc(db, "pengumuman", id));
    fetchData();
  };

  const formatDate = (ts) => {
    if (!ts) return "";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  // --- Not ready: show nothing/spinner ---
  if (!authReady) return (
    <div className="pa-loading">
      <div className="pa-spinner" />
      <p>Loading…</p>
    </div>
  );

  // --- Not logged in: show login form ---
  if (!user) return (
    <div className="login-page">
      <div className="login-card">
        <img src="/logo.png" alt="GLOW" className="login-logo" />
        <h1 className="login-title">Admin Access</h1>
        <p className="login-sub">GLOW — Announcement Management</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
          </div>
          <button type="submit" className="btn-primary" disabled={signingIn} style={{ width: "100%", justifyContent: "center" }}>
            {signingIn ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <a href="/" className="login-back">← Back to website</a>
      </div>
    </div>
  );

  // --- Logged in: management dashboard ---
  const managed = items.filter((it) => (it.edition || "2026") === activeEdition);

  return (
    <div className="pa-page">
      <div className="pa-header">
        <div className="container">
          <a href="/" className="part-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
            Back to Home
          </a>
          <span className="section-label">Admin · Announcement Management</span>
          <div className="pa-title-row">
            <h1 className="section-title">Manage Announcements</h1>
            <button className="btn-outline" onClick={() => signOut(auth)}>Sign Out</button>
          </div>
          <p className="pa-user">Logged in as <strong>{user.email}</strong></p>
        </div>
      </div>

      {/* Edition filter */}
      <div className="pa-archive-wrap">
        <div className="container pa-archive">
          <span className="pa-archive-label">Editing</span>
          <div className="pa-archive-tabs">
            {EDITIONS.map((ed) => (
              <button
                key={ed.id}
                className={`pa-tab ${activeEdition === ed.id ? "active" : ""}`}
                onClick={() => { setActiveEdition(ed.id); setForm((p) => ({ ...p, edition: ed.id })); }}
              >
                {ed.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container pa-body">
        <div className="pa-form-card">
          <h3>{editId ? "Edit Announcement" : "New Announcement"}</h3>
          <form onSubmit={handleSubmit} className="pa-form">
            <div className="form-group">
              <label>Edition</label>
              <div className="pa-edition-select">
                {EDITIONS.map((ed) => (
                  <button
                    type="button"
                    key={ed.id}
                    className={`pa-edition-chip ${form.edition === ed.id ? "active" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, edition: ed.id }))}
                  >
                    {ed.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input value={form.judul} onChange={(e) => setForm((p) => ({ ...p, judul: e.target.value }))} placeholder="Announcement title" required />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea value={form.isi} onChange={(e) => setForm((p) => ({ ...p, isi: e.target.value }))} placeholder="Announcement details…" required rows={4} />
            </div>
            <div className="form-group">
              <label>Link (optional)</label>
              <input type="url" value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://…" />
            </div>
            <div className="pa-form-actions">
              <button type="submit" className="btn-primary">{editId ? "Update" : "Publish"}</button>
              {editId && <button type="button" className="btn-outline" onClick={() => { setEditId(null); setForm({ judul: "", isi: "", link: "", edition: activeEdition }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        {managed.length === 0 ? (
          <div className="pa-empty">
            <p>No announcements for {EDITIONS.find((e) => e.id === activeEdition)?.label} yet.</p>
          </div>
        ) : (
          <div className="pa-list">
            {managed.map((item) => (
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
                <div className="pa-item-actions">
                  <button className="btn-outline pa-edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn-outline pa-del-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAnnounce;
