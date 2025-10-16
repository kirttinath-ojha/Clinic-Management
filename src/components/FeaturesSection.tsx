
import { Stethoscope, ClipboardList, UserCheck, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block glass px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Comprehensive Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Streamlined Clinic Management
          </h2>
          <p className="text-lg text-foreground/70">
            Everything you need to efficiently manage your medical facilities in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Stethoscope className="h-6 w-6 text-primary" />} 
            title="Provider Onboarding" 
            description="Simplified process for adding new practitioners to your medical facility."
          />
          <FeatureCard 
            icon={<ClipboardList className="h-6 w-6 text-primary" />} 
            title="Compliance Tracking" 
            description="Easily track and manage regulatory compliance requirements."
          />
          <FeatureCard 
            icon={<UserCheck className="h-6 w-6 text-primary" />} 
            title="Staff Credentialing" 
            description="Streamline credential verification and management for all providers."
          />
          <FeatureCard 
            icon={<Calendar className="h-6 w-6 text-primary" />} 
            title="Scheduling Tools" 
            description="Efficient tools for managing appointments and staff schedules."
          />
        </div>
      </div>
    </section>
  );
}
