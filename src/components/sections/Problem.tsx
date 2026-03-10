import { ShieldAlert, Users, Clock, Search } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Problem() {
  const { t, locale } = useTranslation();
  const icons = [ShieldAlert, Users, Clock, Search];

  return (
    <section className="py-24 bg-background" id="problem">
      <div className="container mx-auto px-12 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-primary font-black uppercase tracking-widest text-xs mb-3">{t.problem.badge}</h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 max-w-2xl mx-auto">
            {locale === 'fr' ? (
              <>Trouver <span className="text-accent">« la bonne personne »</span> pour sa maison est un vrai casse-tête.</>
            ) : (
              <>Finding <span className="text-accent">&quot;the right person&quot;</span> for your home is harder than it should be.</>
            )}
          </p>
        </div>
        
        <ScrollReveal delay={200}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.problem.items.map((item: { title: string; description: string }, index: number) => {
              const Icon = icons[index];
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center mb-6 text-danger">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{item.description}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
