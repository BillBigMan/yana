"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, XCircle } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { supabase } from "@/lib/supabase";

type UserType = "family" | "worker" | null;

interface CustomSurveyEvent extends Event {
  detail: UserType;
}

export function MarketSurvey() {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<UserType>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleSetType = (e: Event) => {
      const customEvent = e as CustomSurveyEvent;
      setUserType(customEvent.detail);
      setStep(1);
    };
    window.addEventListener('setSurveyType', handleSetType);
    return () => window.removeEventListener('setSurveyType', handleSetType);
  }, []);

  const questions = userType === "family" ? t.survey.family : t.survey.worker;
  const currentQuestion = questions[step - 1];

  const handleAnswer = async (option: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);
    
    if (step < questions.length) {
      setStep(step + 1);
    } else {
        // Show loading state
        setStatus('loading');
        
        // Parse budget properly
        const parseBudget = (budgetStr: string): number | null => {
          if (!budgetStr) return null;
          const parts = budgetStr.split(' - ');
          if (parts.length === 2) {
            const min = parseInt(parts[0].replace(/\D/g, ''));
            const max = parseInt(parts[1].replace(/\D/g, ''));
            return Math.floor((min + max) / 2);
          } else {
            return parseInt(budgetStr.replace(/\D/g, ''));
          }
        };

        // Parse trust to number or null
        const parseTrust = (trustStr: string): number | null => {
          if (!trustStr) return null;
          const num = parseInt(trustStr.replace(/[^0-9]/g, ''));
          return isNaN(num) ? null : num;
        };

        // Save to Supabase
        const surveyData = {
            user_type: userType,
            // Colonnes directes du questionnaire
            budget: newAnswers.budget,
            discovery: newAnswers.discovery,
            fee: newAnswers.fee,
            frequency: newAnswers.frequency,
            services: newAnswers.services,
            trust: newAnswers.trust,
            // Colonnes optionnelles pour compatibilité future
            current_method: newAnswers.discovery || newAnswers.services,
            verification_trust: parseTrust(newAnswers.trust),
            monthly_budget: parseBudget(newAnswers.budget),
            expected_salary: parseBudget(newAnswers.expected_salary),
            availability: newAnswers.frequency,
            location: newAnswers.discovery,
            created_at: new Date().toISOString()
        };

        try {
            const { error } = await supabase
                .from('market_surveys')
                .insert([surveyData]);
                
            if (error) {
                console.error('Survey save error:', error);
                console.error('Survey data:', surveyData);
                setStatus('error');
                // Continue to completion even if save fails
            } else {
                console.log('Survey saved successfully');
                setStatus('success');
            }
            
            // Show completion message
            setIsCompleted(true);
            // Scroll to waitlist after completion
            setTimeout(() => {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        } catch (error) {
            console.error('Survey submission error:', error);
            setStatus('error');
        }
    }
  };

  if (isCompleted) {
    return (
      <section id="market-survey" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <Card className={`text-center py-16 ${status === 'error' ? 'border-red-100 bg-red-50/30' : 'border-green-100 bg-green-50/30'}`}>
            <div className={`w-16 h-16 ${status === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} rounded-full flex items-center justify-center mx-auto mb-6`}>
              {status === 'error' ? <XCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {status === 'success' 
                ? (t.survey.thankYou)
                : status === 'error'
                ? (t.survey.error)
                : (t.survey.redirecting)}
            </h2>
            <p className="text-gray-600 mb-8">
              {status === 'success' 
                ? (t.survey.thankYouSub)
                : status === 'error'
                ? (t.survey.errorSub)
                : (t.survey.redirecting)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                {t.survey.joinWaitlist}
              </button>
              <button 
                onClick={() => {
                  setIsCompleted(false);
                  setStep(1);
                  setAnswers({});
                  setStatus('idle');
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {status === 'error' ? (t.survey.tryAgain) : (t.survey.anotherSurvey)}
              </button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="market-survey" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-12 md:px-24 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.survey.title}</h2>
          <p className="text-gray-600">{t.survey.subtitle}</p>
        </div>

        <Card className="min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          {/* Progress bar */}
          {userType && (
             <div className="absolute top-0 left-0 h-1 bg-blue-100 w-full">
                <div 
                    className="h-full bg-blue-600 transition-all duration-500" 
                    style={{ width: `${(step / questions.length) * 100}%` }}
                />
             </div>
          )}

          {step === 0 ? (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center text-gray-900">{t.survey.whoAreYou}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => { setUserType('family'); setStep(1); }}
                    className="p-8 border-2 border-gray-100 rounded-2xl hover:border-primary hover:bg-blue-50 transition-all text-center group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-blue-100 text-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg text-gray-900">{t.survey.imLookingForHelp}</span>
                  </button>
                  <button 
                    onClick={() => { setUserType('worker'); setStep(1); }}
                    className="p-8 border-2 border-gray-100 rounded-2xl hover:border-accent hover:bg-orange-50 transition-all text-center group cursor-pointer"
                  >
                     <div className="w-12 h-12 bg-orange-100 text-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg text-gray-900">{t.survey.imLookingForAJob}</span>
                  </button>
                </div>
            </div>
          ) : status === 'loading' ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-lg text-gray-600 mt-4">
                {t.survey.loading || "Submitting your responses..."}
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <button 
                    onClick={() => setStep(step - 1)}
                    className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" /> {t.survey.back}
                </button>
                
                <div className="pt-8">
                    <p className="text-sm font-medium text-blue-600 mb-2">{t.survey.question} {step} {t.survey.of} {questions.length}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">{currentQuestion.question}</h3>
                    
                <div className="grid gap-3">
                        {currentQuestion.options.map((option: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-accent hover:bg-orange-50 transition-all flex items-center justify-between group active:scale-[0.98] min-h-[64px] cursor-pointer"
                            >
                                <span className="font-bold text-gray-700 text-base">{option}</span>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-accent transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
