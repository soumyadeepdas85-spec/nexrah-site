import LiveBackground from "@/components/LiveBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { CaseStudies, Faq, Founder, Insights, Clients, Process, ServiceTicker, Services } from "@/components/Sections";

const SHOW_CASE_STUDIES = false;

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
        <ServiceTicker />
        <Services />
        <Portfolio />
        {/* Case studies hidden for now: set SHOW_CASE_STUDIES to true to bring it back */}
        {SHOW_CASE_STUDIES && <CaseStudies />}
        <Process />
        <Insights />
        <Founder />
        <Faq />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
