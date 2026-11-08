import { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const INIT = { name: "", email: "", message: "" };

export function Contact() {
  const [form, setForm] = useState(INIT);
  const [sending, setSending] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSending(true);
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      { from_name: form.name, from_email: form.email, message: form.message },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      alert("Message sent successfully!");
      setForm(INIT);
    }).catch(() => {
      alert("Failed to send. Please try again.");
    }).finally(() => setSending(false));
  }, [form]);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="contact-heading">
              <span className="section-label">Get in Touch</span>
              <h2 className="section-title">Help Center</h2>
            </div>

            <div className="contact-body-left">
              <p className="section-desc">Have questions about GLOW 2026? Reach out and we'll respond as soon as possible.</p>

              <div className="contact-info-list">
                <a
                  href="https://wa.me/6282117564248?text=Halo%20ICAO%20GLOW%2C%20saya%20mau%20bertanya%20tentang%20GLOW%202026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-item contact-info-item--wa"
                >
                  <span className="ci-icon ci-icon--wa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.82c0 4.53-3.69 8.23-8.21 8.23zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg>
                  </span>
                  <div>
                    <p className="ci-label">WhatsApp</p>
                    <p className="ci-value">Chat with us directly</p>
                  </div>
                </a>
                <a href="https://g.co/kgs/LF3k4kB" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                  <span className="ci-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <div>
                    <p className="ci-label">Address</p>
                    <p className="ci-value">Tokong Nanas Building 9F, Telkom University</p>
                  </div>
                </a>
              </div>

              <div className="social-links">
                <a href="https://www.instagram.com/icaotelkomuniversity/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  @icaotelkomuniversity
                </a>
                <a href="https://www.youtube.com/@icaotelkomuniversity8149" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.5 6.19a3 3 0 0 0-2.12-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3 3 0 0 0 .5 6.19C0 8.09 0 12 0 12s0 3.91.5 5.81A3 3 0 0 0 2.62 19.95C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3 3 0 0 0 2.12-2.14C24 15.91 24 12 24 12s0-3.91-.5-5.81zM9.54 15.57V8.43L15.82 12l-6.28 3.57z"/></svg>
                  ICAO Telkom University
                </a>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <div className="contact-heading contact-heading--spacer" aria-hidden="true">
              <span className="section-label">Get in Touch</span>
              <h2 className="section-title">Help Center</h2>
            </div>
            <div className="form-card">
              <h3 className="form-card-title">Send us a message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" required autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required autoComplete="email" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required rows={5} />
                </div>
                <button type="submit" className="btn-primary" disabled={sending} style={{ width: "100%", justifyContent: "center" }}>
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
