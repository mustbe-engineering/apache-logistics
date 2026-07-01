import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { Fleet } from "@/components/Fleet";
import { FloatingTruck } from "@/components/FloatingTruck";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Routes } from "@/components/Routes";
import { SectionDivider } from "@/components/SectionDivider";
import { Services } from "@/components/Services";
import { StatsBar } from "@/components/StatsBar";
import { Units } from "@/components/Units";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <SectionDivider />
        <Fleet />
        <Routes />
        <Units />
        <div className="relative">
          <Clients />
          <FloatingTruck />
        </div>
      </main>
      <Footer />
    </>
  );
}
