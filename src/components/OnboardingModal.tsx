
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Hospital, Mail, Phone, User, MapPin, Check } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: string;
}

export function OnboardingModal({ isOpen, onClose, selectedTier }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clinicName: "",
    clinicType: "",
    numberOfProviders: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Onboarding request submitted", {
        description: "We'll be in touch with you shortly.",
        icon: <Check className="h-4 w-4 text-green-500" />,
      });
      onClose();
      setStep(1);
      setFormData({
        clinicName: "",
        clinicType: "",
        numberOfProviders: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
              <Hospital className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium text-foreground">Selected Plan</h3>
                <p className="text-sm text-muted-foreground">{selectedTier}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinicName">Clinic Name</Label>
                <Input
                  id="clinicName"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  placeholder="Enter clinic name"
                  className="glass-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clinicType">Clinic Type</Label>
                <Select 
                  value={formData.clinicType} 
                  onValueChange={(value) => handleSelectChange("clinicType", value)}
                  required
                >
                  <SelectTrigger id="clinicType" className="glass-input">
                    <SelectValue placeholder="Select clinic type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Care</SelectItem>
                    <SelectItem value="specialty">Specialty Care</SelectItem>
                    <SelectItem value="dental">Dental</SelectItem>
                    <SelectItem value="urgent">Urgent Care</SelectItem>
                    <SelectItem value="other">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="numberOfProviders">Number of Providers</Label>
                <Select 
                  value={formData.numberOfProviders} 
                  onValueChange={(value) => handleSelectChange("numberOfProviders", value)}
                  required
                >
                  <SelectTrigger id="numberOfProviders" className="glass-input">
                    <SelectValue placeholder="Select number of providers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5</SelectItem>
                    <SelectItem value="6-15">6-15</SelectItem>
                    <SelectItem value="16-30">16-30</SelectItem>
                    <SelectItem value="31-50">31-50</SelectItem>
                    <SelectItem value="50+">50+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 py-4">
            <div className="bg-secondary/50 p-4 rounded-xl space-y-1">
              <h3 className="font-medium text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Contact Information
              </h3>
              <p className="text-sm text-muted-foreground">
                How we can reach you regarding your onboarding.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="glass-input"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="glass-input pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className="glass-input pl-10"
                      required
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 py-4">
            <div className="bg-secondary/50 p-4 rounded-xl space-y-1">
              <h3 className="font-medium text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Clinic Address
              </h3>
              <p className="text-sm text-muted-foreground">
                The location of your clinic.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="glass-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className="glass-input"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                    className="glass-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className="glass-input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] glass-card border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Clinic Onboarding Request</DialogTitle>
          <DialogDescription className="text-center">
            Complete the form below to begin your clinic onboarding process.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? 'bg-primary text-white' : 'bg-secondary text-foreground/50'
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <div 
                    className={`h-0.5 w-10 ${
                      step > i ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          {renderStep()}
          
          <DialogFooter className="mt-6 flex justify-between sm:justify-between gap-2">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                className="glass-input hover:bg-secondary/50"
              >
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button 
                type="button" 
                onClick={handleNext}
                className="ml-auto bg-primary hover:bg-primary/90 text-white"
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="ml-auto bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
