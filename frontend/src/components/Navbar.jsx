import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#problem", label: "Problem" },
    { href: "#solution", label: "Solution" },
    { href: "#dashboard", label: "Dashboard" },
    { href: "#tech", label: "Tech Stack" },
    { href: "#impact", label: "Impact" },
  ];

  return (
    <nav className={`navbar-ag ${scrolled ? "scrolled" : ""}`}>
      <a href="#home" className="nav-brand">
        <div className="nav-brand-icon">🛡️</div>
        Agri<span className="brand-tag">Guard</span>
      </a>

      <ul className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#dashboard" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Live Demo →
          </a>
        </li>
      </ul>

      <button
        style={{
          background: "none", border: "none", color: "var(--text-primary)",
          fontSize: "1.5rem", cursor: "pointer", display: "none",
        }}
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}
