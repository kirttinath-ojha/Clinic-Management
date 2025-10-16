
import { Building, UserCheck, ClipboardList, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <div className="glass-card p-8 rounded-xl text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
      <p className="text-foreground/70">{label}</p>
    </div>
  );
};

export function StatisticsSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Making a Real Difference in Healthcare Administration
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Building className="h-6 w-6 text-primary" />} 
            value="500+" 
            label="Clinics Onboarded"
          />
          <StatCard 
            icon={<UserCheck className="h-6 w-6 text-primary" />} 
            value="5,000+" 
            label="Healthcare Providers"
          />
          <StatCard 
            icon={<ClipboardList className="h-6 w-6 text-primary" />} 
            value="98%" 
            label="Compliance Rate"
          />
          <StatCard 
            icon={<Clock className="h-6 w-6 text-primary" />} 
            value="70%" 
            label="Time Saved on Admin"
          />
        </div>
      </div>
    </section>
  );
}
