import { useEffect, useRef } from "react";

const impacts = [
  { number: "68%", title: "Mortality Reduction", desc: "Early AI detection reduces preventable animal deaths by more than two-thirds." },
  { number: "5×", title: "Faster Outbreak Response", desc: "Geo-alerts shrink disease identification time from days to under 30 minutes." },
  { number: "₹2.4L", title: "Annual Savings / Farm", desc: "Reduced medicine waste, fewer losses, and optimized breeding decisions compound." },
  { number: "10+", title: "Regional Languages", desc: "Inclusive access for Marathi, Hindi, Tamil, Telugu, Kannada, and more." },
  { number: "Zero", title: "Internet Needed Offline", desc: "Full core functionality with SQLite caching — works in the remotest villages." },
  { number: "1B+", title: "Animals Protectable", desc: "The platform scales to cover India's entire livestock population." },
];

export default function ImpactSection() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" className="section" ref={ref}>
      <div className="container-ag">
        <div className="fade-up" style={{ textAlign: "center" }}>
          <div className="section-label">Impact & Benefits</div>
          <h2 className="section-title">
            Numbers That <span style={{ color: "var(--accent-amber)" }}>Matter</span>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            AgriGuard doesn't just digitize — it transforms outcomes for farmers,
            vets, governments, and the animals themselves.
          </p>
        </div>

        <div className="impact-grid">
          {impacts.map((item, i) => (
            <div
              key={item.title}
              className="glass-card impact-card fade-up"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="impact-number">{item.number}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* One Health Banner */}
        <div
          className="glass-card fade-up"
          style={{
            marginTop: "3rem", padding: "2.5rem",
            background: "linear-gradient(135deg, rgba(74,222,128,0.07), rgba(45,212,191,0.05))",
            borderColor: "rgba(74,222,128,0.2)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌐</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            Advancing the <span style={{ color: "var(--accent-green)" }}>One Health</span> Vision
          </h3>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            By connecting animal health, human biosafety, and environmental monitoring,
            AgriGuard creates a unified defense against zoonotic diseases — protecting
            farms, communities, and the food supply simultaneously.
          </p>
        </div>
      </div>
    </section>
  );
}
