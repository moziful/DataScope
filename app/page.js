import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import InteractiveExplorer from "@/components/landing/InteractiveExplorer";
import AnalyticsBenchmark from "@/components/landing/AnalyticsBenchmark";
import TechDecisions from "@/components/landing/TechDecisions";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Content Stack */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Core Architecture & Features */}
        <Features />

        {/* Live Interactive Data Explorer Preview */}
        <InteractiveExplorer />

        {/* Analytics & Performance Benchmarks */}
        <AnalyticsBenchmark />

        {/* Mandatory 8 Technical Decisions (ADR) */}
        <TechDecisions />
      </main>

      {/* 3. Enterprise Footer */}
      <Footer />
    </div>
  );
}
