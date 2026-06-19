import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Fleet } from "@/components/Fleet";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { StatsBar } from "@/components/StatsBar";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <Fleet />
        <Clients />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
