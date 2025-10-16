
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  facility: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "This platform has revolutionized how we onboard new clinics. What used to take weeks now happens in days, with far fewer headaches for everyone involved.",
    author: "Dr. Sarah Johnson",
    role: "Medical Director",
    facility: "Sunshine Medical Group"
  },
  {
    quote: "The compliance tracking feature alone has saved us countless hours of administrative work. It's like having an extra staff member dedicated to paperwork.",
    author: "Michael Chen",
    role: "Practice Manager",
    facility: "Westside Family Practice"
  },
  {
    quote: "We expanded from 3 to 8 locations in a year, and this platform made scaling our operations so much smoother than I anticipated.",
    author: "Dr. Robert Williams",
    role: "CEO",
    facility: "Cascade Health Network"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/30 dark:bg-secondary/10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block glass px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-lg text-foreground/70">
            See what medical professionals are saying about our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-6">
                <svg className="h-8 w-8 text-primary/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-foreground/80 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-foreground/70">{testimonial.role}, {testimonial.facility}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
