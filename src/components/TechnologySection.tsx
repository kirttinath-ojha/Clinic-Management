
import { Brain, ClipboardList, Calendar, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TechFeature = ({ icon, title, description }: TechFeatureProps) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </div>
    </div>
  );
};

export function TechnologySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block glass px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Advanced Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Cutting-Edge Healthcare Technology Solutions
          </h2>
          <p className="text-lg text-foreground/70">
            Leverage the power of AI and advanced technologies to transform your clinic operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <TechFeature 
            icon={<Brain className="h-6 w-6 text-primary" />} 
            title="AI-Powered Diagnostics" 
            description="Integrate powerful AI algorithms to assist with diagnostics, treatment planning, and patient risk assessment."
          />
          <TechFeature 
            icon={<ClipboardList className="h-6 w-6 text-primary" />} 
            title="Customized EMR Solutions" 
            description="Tailor electronic medical records to your specific workflows and specialties for maximum efficiency."
          />
          <TechFeature 
            icon={<Calendar className="h-6 w-6 text-primary" />} 
            title="Smart Appointment Scheduling" 
            description="Dynamic scheduling system that optimizes provider time and improves patient satisfaction."
          />
          <TechFeature 
            icon={<Database className="h-6 w-6 text-primary" />} 
            title="Dynamic Data Analytics" 
            description="Real-time insights into clinic performance, patient outcomes, and operational efficiency."
          />
        </div>

        <div className="mt-16 text-center">
          <button className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/90 transition-colors font-medium">
            Request Demo
          </button>
        </div>
      </div>
    </section>
  );
}
