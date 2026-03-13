import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController, BarController, DoughnutController,
  LineElement, BarElement, ArcElement,
  PointElement, CategoryScale, LinearScale,
  Tooltip, Legend, Filler,
} from "chart.js";

Chart.register(
  LineController, BarController, DoughnutController,
  LineElement, BarElement, ArcElement,
  PointElement, CategoryScale, LinearScale,
  Tooltip, Legend, Filler
);

const COLORS = {
  green: "#4ade80",
  teal: "#2dd4bf",
  amber: "#fbbf24",
  red: "#f87171",
  purple: "#a78bfa",
};

const alerts = [
  { type: "critical", region: "Pune District", disease: "FMD Outbreak", count: "23 cases", time: "2m ago" },
  { type: "warning", region: "Nashik, MH", disease: "PPR Alert", count: "8 cases", time: "18m ago" },
  { type: "warning", region: "Solapur, MH", disease: "BRD Spike", count: "11 cases", time: "35m ago" },
  { type: "safe", region: "Kolhapur, MH", disease: "All Clear", count: "0 cases", time: "1h ago" },
  { type: "safe", region: "Aurangabad", disease: "Monitored", count: "0 cases", time: "2h ago" },
];

const metrics = [
  { label: "Animals Monitored", value: "48,291", change: "+1.2k", up: true, color: COLORS.green },
  { label: "Disease Risk Score", value: "2.4/10", change: "-0.3", up: false, color: COLORS.teal },
  { label: "Vets Available", value: "142", change: "+12", up: true, color: COLORS.amber },
  { label: "Alerts (24h)", value: "7", change: "+3", up: false, color: COLORS.red },
];

function useLiveLineChart(canvasRef) {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    const detected = [12, 18, 14, 22, 17, 28, 21, 34];
    const prevented = [8, 14, 11, 18, 15, 24, 18, 30];

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Diseases Detected",
            data: detected,
            borderColor: COLORS.green,
            backgroundColor: "rgba(74,222,128,0.08)",
            borderWidth: 2.5,
            pointBackgroundColor: COLORS.green,
            pointRadius: 4,
            pointHoverRadius: 7,
            tension: 0.45,
            fill: true,
          },
          {
            label: "Outbreaks Prevented",
            data: prevented,
            borderColor: COLORS.teal,
            backgroundColor: "rgba(45,212,191,0.06)",
            borderWidth: 2.5,
            pointBackgroundColor: COLORS.teal,
            pointRadius: 4,
            pointHoverRadius: 7,
            tension: 0.45,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "rgba(240,253,244,0.55)", font: { size: 11, family: "DM Sans" }, boxWidth: 12 } },
          tooltip: {
            backgroundColor: "rgba(5,13,18,0.95)",
            borderColor: "rgba(74,222,128,0.2)",
            borderWidth: 1,
            titleColor: "#f0fdf4",
            bodyColor: "rgba(240,253,244,0.7)",
          },
        },
        scales: {
          x: { ticks: { color: "rgba(240,253,244,0.35)", font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.04)" } },
          y: { ticks: { color: "rgba(240,253,244,0.35)", font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.04)" } },
        },
      },
    });

    // Live simulation
    const interval = setInterval(() => {
      const c = chartRef.current;
      c.data.datasets[0].data.push(Math.floor(Math.random() * 15) + 25);
      c.data.datasets[1].data.push(Math.floor(Math.random() * 12) + 20);
      c.data.labels.push(["Sep", "Oct", "Nov", "Dec"][Math.floor(Math.random() * 4)]);
      if (c.data.datasets[0].data.length > 10) {
        c.data.datasets[0].data.shift();
        c.data.datasets[1].data.shift();
        c.data.labels.shift();
      }
      c.update("active");
    }, 2500);

    return () => { clearInterval(interval); chartRef.current?.destroy(); };
  }, [canvasRef]);
}

function useDoughnutChart(canvasRef) {
  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: ["Cattle", "Poultry", "Swine", "Goat"],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: [COLORS.green, COLORS.teal, COLORS.amber, COLORS.purple],
          borderColor: "rgba(5,13,18,0.5)",
          borderWidth: 3,
          hoverOffset: 8,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: "68%",
        plugins: {
          legend: { position: "bottom", labels: { color: "rgba(240,253,244,0.55)", font: { size: 11, family: "DM Sans" }, boxWidth: 10, padding: 14 } },
          tooltip: {
            backgroundColor: "rgba(5,13,18,0.95)",
            borderColor: "rgba(74,222,128,0.2)",
            borderWidth: 1,
            titleColor: "#f0fdf4",
            bodyColor: "rgba(240,253,244,0.7)",
          },
        },
      },
    });
    return () => chart.destroy();
  }, [canvasRef]);
}

export default function DashboardSection() {
  const lineRef = useRef(null);
  const doughnutRef = useRef(null);
  const [tick, setTick] = useState(0);

  useLiveLineChart(lineRef);
  useDoughnutChart(doughnutRef);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="section dashboard-section">
      <div className="container-ag">
        <div className="dashboard-header">
          <div>
            <div className="section-label">Live Dashboard</div>
            <h2 className="section-title">Real-Time Disease Intelligence</h2>
          </div>
          <div className="live-badge">
            <div className="pulse-dot" />
            Live Feed Active
          </div>
        </div>

        {/* Metrics */}
        <div className="metrics-row" style={{ marginBottom: "1.5rem" }}>
          {metrics.map((m) => (
            <div className="glass-card metric-card" key={m.label}>
              <div className="metric-value" style={{ color: m.color }}>{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className={`metric-change ${m.up ? "change-up" : "change-down"}`}>
                {m.up ? "▲" : "▼"} {m.change} this week
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="glass-card chart-card">
            <h4>Disease Detection Trend (Live Simulation)</h4>
            <div className="chart-wrapper">
              <canvas ref={lineRef} />
            </div>
          </div>
          <div className="glass-card chart-card">
            <h4>Livestock Distribution</h4>
            <div className="chart-wrapper">
              <canvas ref={doughnutRef} />
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="glass-card alert-card" style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              🚨 Regional Disease Alerts
            </h4>
            <span style={{ fontSize: "0.72rem", color: "var(--accent-teal)" }}>
              Updated {tick}s ago
            </span>
          </div>
          <div className="alert-list">
            {alerts.map((a) => (
              <div className={`alert-item ${a.type}`} key={a.region}>
                <div className="alert-dot" />
                <div className="alert-info">
                  <h5>{a.region} — {a.disease}</h5>
                  <p>{a.count} reported</p>
                </div>
                <span className="alert-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
