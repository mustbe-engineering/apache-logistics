import dynamic from "next/dynamic";
import { About } from "@/components/About";
import { FleetNearGate } from "@/components/fleet/FleetNearGate";
import { FloatingTruck } from "@/components/FloatingTruck";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Routes } from "@/components/Routes";
import { Services } from "@/components/Services";
import { StatsBar } from "@/components/StatsBar";

const Clients = dynamic(() => import("@/components/Clients").then((m) => m.Clients), {
  loading: () => <div className="min-h-[28rem] scroll-mt-[var(--nav-offset)]" aria-hidden />,
});

const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer), {
  loading: () => <footer className="min-h-[18rem] border-t border-nav/10 bg-base" aria-hidden />,
});

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-[var(--nav-offset)]">
        <Hero />
        <StatsBar />
        <About />
        <Services />
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
