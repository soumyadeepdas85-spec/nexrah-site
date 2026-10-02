import LiveBackground from "@/components/LiveBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { CaseStudies, Faq, Founder, Insights, Marquee, Process, Services } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <LiveBackground />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <CaseStudies />
        <Process />
        <Insights />
        <Founder />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
