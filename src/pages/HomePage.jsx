import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ServicesGrid from "../components/home/ServicesGrid";
import DevisCallout from "../components/home/DevisCallout";
import ContactSection from "../components/home/ContactSection";
import ReviewsCarousel from "../components/home/ReviewsCarousel";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <AboutSection />
      <DevisCallout />
      <ServicesGrid />
      <ReviewsCarousel />
      <ContactSection />
    </motion.div>
  );
}
