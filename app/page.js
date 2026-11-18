import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* 1. Header Navigation */}
          <Navbar />

          {/* 2. Hero Section */}
          <main className="flex-1">
            <Hero />
          </main>
        </div>
        );
}
