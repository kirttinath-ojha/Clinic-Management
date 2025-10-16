
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StatisticsSection } from "@/components/StatisticsSection";
import { TechnologySection } from "@/components/TechnologySection";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <StatisticsSection />
          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <TechnologySection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
