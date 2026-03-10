import { CheckCircle2, ShieldCheck, MapPin, MessageSquare, Star, LucideIcon } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export function Solution() {
  const { t } = useTranslation();
  const icons: LucideIcon[] = [ShieldCheck, Star, MapPin, MessageSquare];

  // Type assertion to match actual data structure
  const solution = t.solution as unknown as {
    badge: string;
    title: string;
    description: string;
    features: string[];
    items: { title: string; description: string; }[];
  };

  return (
    <section className="py-24 bg-white" id="solution">
      <div className="container mx-auto px-12 md:px-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-primary font-black uppercase tracking-widest text-xs mb-3">{solution.badge}</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {solution.title}
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              {solution.description}
            </p>
            
            <div className="space-y-4">
              {solution.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span className="font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
            {solution.items.map((item, index) => {
              const Icon = icons[index];
              return (
                <div key={index} className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4 text-white font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
