import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import DashboardSection from "./components/DashboardSection";
import TechStackSection from "./components/TechStackSection";
import ImpactSection from "./components/ImpactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* Atmospheric background layers */}
      <div className="bg-canvas" />
      <div className="bg-grid" />

      <div className="app-wrapper">
        <Navbar />

        <main>
          <HeroSection />
          <div className="section-divider" />
          <ProblemSection />
          <div className="section-divider" />
          <SolutionSection />
          <div className="section-divider" />
          <DashboardSection />
          <div className="section-divider" />
          <TechStackSection />
          <div className="section-divider" />
          <ImpactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
