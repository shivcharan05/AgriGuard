import { useEffect, useRef } from "react";

const stack = [
  { icon: "⚛️", name: "React.js", desc: "Frontend UI & Mobile (React Native)", tag: "Frontend" },
  { icon: "⚡", name: "FastAPI + Node.js", desc: "High-performance REST APIs + Auth", tag: "Backend" },
  { icon: "🧠", name: "CNN + YOLOv8", desc: "Image-based disease & hygiene analysis", tag: "AI/ML" },
  { icon: "🌲", name: "Random Forest", desc: "Disease prediction from farm data inputs", tag: "ML Model" },
  { icon: "📈", name: "Prophet / LSTM", desc: "Time-series outbreak forecasting", tag: "Forecasting" },
  { icon: "🗄️", name: "MongoDB + SQLite", desc: "Cloud & offline-first data persistence", tag: "Database" },
  { icon: "📍", name: "PostGIS + GPS API", desc: "Geo-spatial disease mapping & alerts", tag: "Geo-Stack" },
  { icon: "📹", name: "WebRTC / Jitsi", desc: "Real-time tele-vet video consultations", tag: "Comms" },
];

export default function TechStackSection() {
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
    <section id="tech" className="section" ref={ref}>
      <div className="container-ag">
        <div className="fade-up" style={{ textAlign: "center" }}>
          <div className="section-label">Technical Approach</div>
          <h2 className="section-title">
            Built on a <span style={{ color: "var(--accent-teal)" }}>Production-Grade</span> Stack
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Every component was chosen for real-world reliability: offline-first,
            multilingual, lightweight inference, and rural-network resilience.
          </p>
        </div>

        <div className="tech-grid">
          {stack.map((s, i) => (
            <div
              key={s.name}
              className="glass-card tech-card fade-up"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="tech-icon">{s.icon}</div>
              <h4>{s.name}</h4>
              <p>{s.desc}</p>
              <div className="tech-tag">{s.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
