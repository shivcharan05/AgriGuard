import { useEffect, useRef } from "react";

const features = [
  {
    icon: "🤖",
    title: "AI Health Diagnosis",
    desc: "Upload a photo — our CNN + YOLOv8 model returns a farm risk score and animal health prediction within seconds.",
  },
  {
    icon: "🗺️",
    title: "Geo Disease Alerts",
    desc: "Real-time Prophet/LSTM models detect outbreak clusters. Farmers within 50km get instant push notifications.",
  },
  {
    icon: "📱",
    title: "Digital E-Health Card",
    desc: "Every animal gets a digital identity with full vaccination, medicine, and breeding history — accessible offline.",
  },
  {
    icon: "👨‍⚕️",
    title: "Tele-Vet Consultation",
    desc: "Connect with certified vets via WebRTC video calls. No more waiting days for rural vet visits.",
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    desc: "Farm-level dashboards show health trends, disease risk scores, and compliance status at a glance.",
  },
  {
    icon: "🌍",
    title: "Multilingual & Offline",
    desc: "Works in 10+ regional languages. SQLite caching ensures full functionality without internet access.",
  },
];

export default function SolutionSection() {
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
    <section id="solution" className="section" ref={ref}>
      <div className="container-ag">
        <div className="fade-up" style={{ textAlign: "center" }}>
          <div className="section-label">Our Solution</div>
          <h2 className="section-title">
            One Platform. <span style={{ color: "var(--accent-green)" }}>Complete Coverage.</span>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            AgriGuard is the only end-to-end system combining AI diagnostics,
            community alerts, expert access, and digital records — built for the
            realities of rural India.
          </p>
        </div>

        <div className="solution-features">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card feature-card fade-up"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
