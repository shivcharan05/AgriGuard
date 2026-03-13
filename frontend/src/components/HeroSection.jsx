import { useEffect, useRef } from "react";

const stats = [
  { number: "68%", label: "Disease Detected Early" },
  { number: "12K+", label: "Farmers Protected" },
  { number: "3.2x", label: "Productivity Gain" },
  { number: "94%", label: "AI Accuracy" },
];

export default function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="hero-content">
        <div className="hero-badge">
          <div className="pulse-dot" />
          AI-Powered Livestock Health Platform
        </div>

        <h1 className="hero-title">
          Guard Your Herd.<br />
          <span className="line-accent">Secure Your Future.</span>
        </h1>

        <p className="hero-subtitle">
          AgriGuard integrates real-time AI diagnostics, geo-based outbreak alerts,
          and digital health records — giving every farmer a world-class veterinary
          system in their pocket.
        </p>

        <div className="hero-actions">
          <a href="#dashboard" className="btn-primary-ag">
            View Live Dashboard →
          </a>
          <a href="#solution" className="btn-outline-ag">
            How It Works
          </a>
        </div>

        <div className="hero-stats fade-up">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
