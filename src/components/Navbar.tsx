
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { Hospital } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hospital className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="font-semibold text-xl sm:text-2xl text-foreground">ClinicOnboard</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Home</a>
            <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
            <a href="#" className="text-foreground/80 hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <a 
              href="#pricing" 
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
