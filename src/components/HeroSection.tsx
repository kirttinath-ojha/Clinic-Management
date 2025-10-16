
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-[50%] -left-[5%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-32 sm:pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <div className="inline-block glass px-4 py-2 rounded-full mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <span className="text-sm font-medium text-primary">Streamlined Clinic Onboarding</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-slide-up" style={{ animationDelay: "0.4s" }}>
                Modern Solutions for <span className="text-primary">Healthcare</span> Administration
              </h1>
            </div>
            <p className="text-lg md:text-xl text-foreground/70 max-w-xl animate-slide-up" style={{ animationDelay: "0.6s" }}>
              Simplify your clinic onboarding process with our intuitive platform. 
              Manage facilities, track registrations, and scale your healthcare network effortlessly.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <a 
                href="#pricing" 
                className={cn(
                  "inline-flex items-center justify-center",
                  "h-12 px-8 py-3 text-base font-medium",
                  "text-white bg-primary rounded-full",
                  "hover:bg-primary/90 transition-all",
                  "shadow-sm hover:shadow-md"
                )}
              >
                Get Started
              </a>
              <a 
                href="#" 
                className={cn(
                  "inline-flex items-center justify-center",
                  "h-12 px-8 py-3 text-base font-medium",
                  "text-foreground bg-background border border-border",
                  "rounded-full hover:bg-secondary transition-all",
                )}
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="lg:justify-self-end animate-fade-in hidden lg:block" style={{ animationDelay: "1s" }}>
            <div className="relative">
              <div className="glass-card rounded-2xl p-6 transform hover:translate-y-[-5px] transition-transform duration-300">
                <div className="w-full max-w-lg overflow-hidden rounded-lg">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80" 
                      alt="Healthcare professional using a laptop" 
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </AspectRatio>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-6 bg-secondary/50 dark:bg-secondary/30 rounded-md w-3/4"></div>
                  <div className="h-4 bg-secondary/50 dark:bg-secondary/30 rounded-md w-full"></div>
                  <div className="h-4 bg-secondary/50 dark:bg-secondary/30 rounded-md w-5/6"></div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/20 rounded-full blur-md animate-float"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-lg animate-float" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </div>
        
        {/* Additional Medical Images with Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-20">
          <div className="glass-card rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <AspectRatio ratio={4 / 3}>
              <img 
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80" 
                alt="Modern medical equipment" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="font-medium text-foreground">Advanced Equipment</h3>
              <p className="text-sm text-foreground/70">State-of-the-art technology for superior care</p>
            </div>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <AspectRatio ratio={4 / 3}>
              <img 
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b7e00?auto=format&fit=crop&q=80" 
                alt="Doctor using digital tablet" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="font-medium text-foreground">Digital Healthcare</h3>
              <p className="text-sm text-foreground/70">Streamlined workflows with digital solutions</p>
            </div>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: "0.7s" }}>
            <AspectRatio ratio={4 / 3}>
              <img 
                src="https://images.unsplash.com/photo-1583774198576-115956f561dc?auto=format&fit=crop&q=80" 
                alt="Medical lab technician" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="font-medium text-foreground">Laboratory Services</h3>
              <p className="text-sm text-foreground/70">Accurate diagnostics for informed decisions</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <a 
            href="#pricing" 
            className="flex flex-col items-center text-sm text-foreground/60 hover:text-primary transition-colors animate-float"
          >
            <span className="mb-2">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
