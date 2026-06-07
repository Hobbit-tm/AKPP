import Header from "../components/Header";
import Hero from "../components/Hero";
import Advantages from "../components/Advantages";
import Services from "../components/Services";
import Steps from "../components/Steps";
import Prices from "../components/Prices";
import Reviews from "../components/Reviews";
import ContactSection from "../components/ContactSection";
import FloatingButtons from "../components/FloatingButtons";
import Map2GIS from "../components/Map2GIS";
import Footer from "../components/Footer";
import Faq from "../components/Faq";

export default function PublicSite() {
  return (
    <>
      <Header />
      <Hero />
      <Advantages />
      <Services />
      <Steps />
      <Prices />
      <Reviews />

      <Faq />

      <ContactSection />
      <Map2GIS />

      <FloatingButtons />
      <Footer />
    </>
  );
}
