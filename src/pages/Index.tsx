import { LangProvider } from "@/contexts/LangContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import ReviewsSection from "@/components/ReviewsSection";
import UpdatesSection from "@/components/UpdatesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <ReviewsSection />
        <UpdatesSection />
        <Footer />
      </div>
    </LangProvider>
  );
};

export default Index;
