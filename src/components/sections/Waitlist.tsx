"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, Loader2, Phone, XCircle } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { supabase } from "@/lib/supabase";
import { useWaitlistAnalytics } from "@/hooks/useAnalytics";

export function Waitlist() {
  const { t, locale } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    userType: "family"
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  
  // Analytics tracking
  const { trackWaitlistOpened, trackWaitlistSubmitted } = useWaitlistAnalytics();
  
  // Tracking à l'ouverture du formulaire
  useEffect(() => {
    trackWaitlistOpened();
  }, []);

  // Validation du numéro de téléphone camerounais
  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it starts with 237 and has exactly 12 digits total (+237 + 9 more)
    if (cleanPhone.startsWith('237') && cleanPhone.length === 12) {
      return true;
    }
    
    return false;
  };

  const formatPhoneDisplay = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.startsWith('237') && cleanPhone.length === 12) {
      return `+${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6, 9)} ${cleanPhone.slice(9)}`;
    }
    
    return phone;
  };

  const formatPhoneInput = (value: string): string => {
    // Remove all non-digit characters
    let cleanValue = value.replace(/\D/g, '');
    
    // Always add 2376 prefix (Cameroon country code + mobile prefix)
    if (!cleanValue.startsWith('2376')) {
      cleanValue = '2376' + cleanValue.replace(/^2376?/, '');
    }
    
    // Format with spaces in real-time
    if (cleanValue.length >= 7) {
      return `+${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 9)}${cleanValue.length > 9 ? ' ' + cleanValue.slice(9) : ''}`;
    } else if (cleanValue.length >= 3) {
      return `+${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
    } else {
      return `+${cleanValue}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valider le numéro de téléphone
    if (!validatePhone(formData.phone)) {
      setPhoneError(locale === 'en' 
        ? "Please enter a complete phone number (+237 6XX XXX XXX)" 
        : "Veuillez entrer un numéro de téléphone complet (+237 6XX XXX XXX)");
      setStatus("error");
      return;
    }
    
    // Réinitialiser l'erreur de téléphone si valide
    setPhoneError("");
    setStatus("loading");

    try {
      // Format the phone number before saving
      const formattedPhone = formatPhoneDisplay(formData.phone);
      
      // Insert waitlist entry
      const { error: waitlistError } = await supabase
        .from('waitlist')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formattedPhone,
            city: formData.city,
            user_type: formData.userType
          }
        ]);

      if (waitlistError) {
        console.error('Waitlist error:', waitlistError);
        
        // Gérer les erreurs spécifiques
        if (waitlistError.code === "23505") {
          // Erreur de duplicate key (email déjà existant)
          setErrorMessage(locale === 'en' 
            ? "This email is already registered on our waitlist. Please use a different email or contact us if you need help." 
            : "Cet email est déjà inscrit sur notre liste d'attente. Veuillez utiliser un autre email ou contactez-nous si vous avez besoin d'aide.");
        } else {
          // Erreur générique
          setErrorMessage(locale === 'en' 
            ? "An error occurred while registering. Please try again or contact us directly." 
            : "Une erreur est survenue lors de l'inscription. Veuillez réessayer ou contactez-nous directement.");
        }
        
        setStatus("error");
        return;
      }

      // If there are survey responses, insert them too
      // Note: surveyResponses is not defined in the original code, so I assume it's not needed
      // If you need to insert survey responses, you should define surveyResponses and use it here

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", city: "", userType: "family" });
      
      // Tracking de la soumission réussie
      trackWaitlistSubmitted(formData.city, formData.userType as 'family' | 'worker');
    } catch (error) {
      console.error('Submit error:', error);
      setErrorMessage(locale === 'en' 
        ? "An unexpected error occurred. Please try again." 
        : "Une erreur inattendue est survenue. Veuillez réessayer.");
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
    setPhoneError("");
  };

  if (status === "success") {
    return (
      <section id="waitlist" className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">{t.waitlist.successTitle}</h2>
            <p className="text-xl text-blue-100 mb-8">
              {t.waitlist.successSub.replace("{name}", formData.name.split(' ')[0]).replace("{city}", formData.city)}
            </p>
            <Button 
                variant="secondary" 
                size="lg" 
                onClick={resetForm}
                className="bg-white text-blue-600 hover:bg-blue-50 border-0"
            >
              {t.survey.back}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-24 bg-blue-600">
      <div className="container mx-auto px-12 md:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
              {t.waitlist.title} <br />
              {t.waitlist.titleAccent}
            </h2>
            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
              {t.waitlist.subtitle}
            </p>
            <ul className="space-y-3">
              {t.waitlist.features.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-blue-50 font-medium text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full max-w-lg">
            <Card className="p-8 shadow-2xl border-0 bg-white">
              {/* Message d'erreur */}
              {status === "error" && (errorMessage || phoneError) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">
                      {locale === 'en' ? 'Registration Error' : 'Erreur d\'inscription'}
                    </p>
                    <p className="text-sm text-red-600 mt-1">{errorMessage || phoneError}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">{t.waitlist.form.name}</label>
                    <Input 
                      required 
                      placeholder="Prisca K." 
                      className="min-h-[44px] text-sm border-gray-200 focus:border-primary focus:ring-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">{t.waitlist.form.email}</label>
                    <Input 
                      required 
                      type="email" 
                      placeholder="prisca.k@example.com"
                      className="min-h-[44px] text-sm border-gray-200 focus:border-primary focus:ring-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t.waitlist.form.phone}</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        placeholder="+237 6XX XXX XXX"
                        className={`pl-10 min-h-[44px] text-sm ${
                          phoneError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-primary'
                        }`}
                        type="tel"
                        value={formatPhoneInput(formData.phone)}
                        onChange={(e) => {
                          // Get the current value and clean it
                          let currentValue = e.target.value.replace(/\D/g, '');
                          
                          // Limit to maximum 12 digits total (since we'll add 2376 prefix)
                          if (currentValue.length > 12) {
                            currentValue = currentValue.slice(0, 12);
                          }
                          
                          setFormData({...formData, phone: currentValue});
                          // Clear phone error when user starts typing
                          if (phoneError) setPhoneError("");
                        }}
                        onBlur={() => {
                          if (formData.phone && !validatePhone(formData.phone)) {
                            setPhoneError(locale === 'en' 
                              ? "Please enter a complete phone number (+237 6XX XXX XXX)" 
                              : "Veuillez entrer un numéro de téléphone complet (+237 6XX XXX XXX)");
                          }
                        }}
                      />
                    </div>
                    {phoneError && (
                      <p className="text-xs text-red-500 mt-1">{phoneError}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {locale === 'en' ? 'Format: +237 6XX XXX XXX' : 'Format : +237 6XX XXX XXX'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t.waitlist.form.city}</label>
                    <Input 
                      required 
                      placeholder="Douala"
                      className="min-h-[44px] text-sm"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t.waitlist.form.iam}</label>
                  <select 
                    className="w-full h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.userType}
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  >
                    <option value="family">{t.waitlist.form.options[0]}</option>
                    <option value="worker">{t.waitlist.form.options[1]}</option>
                  </select>
                </div>

                <Button 
                    type="submit" 
                    size="sm"
                    className="w-full text-xs mt-3 bg-accent hover:bg-orange-600 text-white font-black uppercase tracking-widest shadow-lg" 
                    disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.waitlist.form.joining}
                    </>
                  ) : t.waitlist.form.submit}
                </Button>
                <p className="text-xs text-center text-gray-400 mt-3">
                  {t.waitlist.form.terms} 
                  <button className="text-blue-500 hover:underline cursor-pointer ml-1">
                    {locale === 'en' ? 'Terms' : 'Conditions'}
                  </button>
                  {' '}
                  {locale === 'en' ? '&' : 'et'}
                  {' '}
                  <a href="#" className="text-blue-500 hover:underline cursor-pointer">
                    {locale === 'en' ? 'Privacy' : 'Confidentialité'}
                  </a>
                </p>

              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
