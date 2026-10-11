import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrackingSimulator from "@/components/sections/TrackingSimulator";
import SourcingForm from "@/components/sections/SourcingForm";
import ProductCatalog from "@/components/sections/ProductCatalog";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUs from "@/components/sections/WhyUs";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <TrackingSimulator />
        <SourcingForm />
        <ProductCatalog />
        <ServicesSection />
        <WhyUs />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}