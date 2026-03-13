import { useEffect, useRef } from "react";

const problems = [
  {
    icon: "⚠️",
    title: "Late Disease Detection",
    desc: "Diseases spread for days before visible symptoms appear, causing mass mortality and financial devastation.",
  },
  {
    icon: "📋",
    title: "No Digital Records",
    desc: "Vaccination schedules, medicine logs, and breeding data are lost to paper — creating compliance nightmares.",
  },
  {
    icon: "🌐",
    title: "No Vet Access in Rural Areas",
    desc: "Millions of farmers are hours away from certified vets, delaying critical interventions by days.",
  },
  {
    icon: "📡",
    title: "Zero Outbreak Awareness",
    desc: "Disease outbreaks in neighboring farms go undetected, allowing rapid geographic spread.",
  },
  {
    icon: "🔬",
    title: "Poor Biosecurity Practices",
    desc: "Lack of affordable training leads to contaminated farms and cross-species disease transmission.",
  },
  {
    icon: "📉",
    title: "Real-time Monitoring Gap",
    desc: "No affordable IoT or AI monitoring means farmers react to problems instead of preventing them.",
  },
];

export default function ProblemSection() {
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
    <section id="problem" className="section problem-section" ref={ref}>
      <div className="container-ag">
        <div className="fade-up">
          <div className="section-label">The Challenge</div>
          <h2 className="section-title">
            Why Livestock Farming Is<br />
            <span style={{ color: "var(--accent-red)" }}>Losing the War</span> Against Disease
          </h2>
          <p className="section-desc">
            India's 500M+ livestock animals are exposed to preventable diseases daily.
            The gap isn't biological — it's technological and informational.
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="glass-card problem-card fade-up"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="icon-wrap">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
