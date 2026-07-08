import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { FleetNearGate } from "@/components/fleet/FleetNearGate";
import { FloatingTruck } from "@/components/FloatingTruck";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Routes } from "@/components/Routes";
import { SectionDivider } from "@/components/SectionDivider";
import { Services } from "@/components/Services";
import { StatsBar } from "@/components/StatsBar";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-[var(--nav-offset)]">
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <SectionDivider />
        <FleetNearGate />
        <Routes />
        <div className="relative">
          <Clients />
          <FloatingTruck />
        </div>
      </main>
      <Footer />
    </>
  );
}
