import { Search, MessageSquare, CheckCircle, UserPlus, Eye, Handshake, LucideIcon } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export function HowItWorks() {
  const { t } = useTranslation();
  const familyIcons = [Search, MessageSquare, CheckCircle];
  const workerIcons = [UserPlus, Eye, Handshake];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-12 md:px-24">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.howItWorks.title}</h2>
          <p className="text-gray-600 max-w-xl mx-auto">{t.howItWorks.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 relative">
          {/* Vertical divider for large screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

          {/* Families Column */}
          <div className="space-y-12">
            <h3 className="text-2xl font-bold text-center text-blue-600 mb-8">{t.howItWorks.families.title}</h3>
            <div className="space-y-12">
              {t.howItWorks.families.steps.map((step: { title: string; description: string }, i: number) => (
                <Step 
                  key={i}
                  number={i + 1} 
                  icon={familyIcons[i]} 
                  title={step.title} 
                  description={step.description} 
                  color="blue"
                />
              ))}
            </div>
          </div>

          {/* Workers Column */}
          <div className="space-y-12">
            <h3 className="text-2xl font-bold text-center text-accent mb-8">{t.howItWorks.workers.title}</h3>
            <div className="space-y-12">
              {t.howItWorks.workers.steps.map((step: { title: string; description: string }, i: number) => (
                <Step 
                  key={i}
                  number={i + 1} 
                  icon={workerIcons[i]} 
                  title={step.title} 
                  description={step.description} 
                  color="orange"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ number, icon: Icon, title, description, color = "blue" }: { number: number; icon: LucideIcon; title: string; description: string; color?: string }) {
  const colorClasses = color === "orange" ? "bg-orange-100 text-accent" : "bg-blue-100 text-primary";
  
  return (
    <div className="flex gap-6 items-start">
      <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${colorClasses}`}>
        {number}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-5 h-5 ${color === 'orange' ? 'text-accent' : 'text-primary'}`} />
            <h4 className="text-xl font-bold text-gray-900">{title}</h4>
        </div>
        <p className="text-gray-600 leading-relaxed text-base font-medium">{description}</p>
      </div>
    </div>
  );
}
