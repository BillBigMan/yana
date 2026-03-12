"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { useFAQAnalytics } from "@/hooks/useAnalytics";
import { getFAQQuestionId } from "@/lib/instrumentation-client";
import { useLandingAnalytics } from "@/hooks/useAnalytics";

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Analytics tracking
  const { trackFAQOpened } = useFAQAnalytics();
  const { trackCTAClick } = useLandingAnalytics();

  const toggleQuestion = (index: number) => {
    const wasClosed = openIndex === null;
    setOpenIndex(openIndex === index ? null : index);
    
    // Tracking uniquement à l'ouverture
    if (wasClosed && t.faq.questions[index]) {
      const questionId = getFAQQuestionId(t.faq.questions[index].question);
      trackFAQOpened({ question_id: questionId });
    }
  };

  const scrollToWaitlist = () => {
    // Tracking du clic CTA depuis la FAQ
    trackCTAClick('faq_section');
    
    const waitlistElement = document.getElementById('waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.faq.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.faq.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {t.faq.questions.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 hover:cursor-pointer transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                      openIndex === index
                        ? "bg-accent text-white rotate-180"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div 
                    className="px-6 pb-5 text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br />') }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.6}>
          <div className="text-center bg-accent/20 rounded-2xl shadow-lg p-8 w-full">
            <h3 className="text-2xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t.faq.cta.title }}>
            </h3>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 hover:cursor-pointer"
              onClick={scrollToWaitlist}
            >
              {t.faq.cta.button}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
