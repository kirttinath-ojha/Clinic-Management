
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OnboardingModal } from "./OnboardingModal";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for small clinics just getting started.",
    features: [
      "1 Facility onboarding",
      "Basic dashboard access",
      "Email support",
      "48-hour response time"
    ]
  },
  {
    name: "Standard",
    price: "$100",
    description: "Ideal for growing medical practices.",
    features: [
      "5 Facility onboarding",
      "Advanced analytics",
      "Priority email support",
      "24-hour response time",
      "Custom branding options"
    ],
    highlight: true
  },
  {
    name: "Custom",
    price: "Contact us",
    description: "For large healthcare networks with unique needs.",
    features: [
      "Unlimited facility onboarding",
      "Dedicated account manager",
      "Phone and email support",
      "4-hour response time",
      "Custom workflow automation",
      "API access"
    ]
  }
];

export function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");

  const handleGetStarted = (tierName: string) => {
    setSelectedTier(tierName);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-secondary/50 to-transparent dark:from-secondary/10 dark:to-transparent" />
      </div>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block glass px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Flexible Plans</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Choose the Perfect Plan for Your Healthcare Needs
          </h2>
          <p className="text-lg text-foreground/70">
            Simple, transparent pricing that scales with your clinic network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={cn(
                "glass-card rounded-2xl p-8",
                "transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1",
                tier.highlight && "relative border-primary/50 ring-1 ring-primary/20 shadow-md"
              )}
            >
              {tier.highlight && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">{tier.name}</h3>
                <div className="flex justify-center items-baseline my-3">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  {tier.name !== "Custom" && <span className="text-foreground/70 ml-1">/month</span>}
                </div>
                <p className="text-foreground/70">{tier.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <button 
                  onClick={() => handleGetStarted(tier.name)}
                  className={cn(
                    "w-full py-3 px-4 rounded-full text-center text-sm font-medium transition-all",
                    tier.highlight 
                      ? "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow"
                      : "bg-secondary dark:bg-secondary/80 text-foreground hover:bg-secondary/80 dark:hover:bg-secondary/60"
                  )}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OnboardingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTier={selectedTier}
      />
    </section>
  );
}
