"use client";

import { useTranslation } from "@/lib/TranslationContext";
import { MapPin, User, Search, Star, Phone, Navigation, CheckCircle2, Baby, Eraser, Heart, Home as HomeIcon, Send, Calendar, Clock } from "lucide-react";

export function ProductShowcase() {
  const { locale } = useTranslation();

  return (
    <section className="py-24 bg-background overflow-hidden" id="product-preview">
      <div className="container mx-auto px-12 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
            {locale === 'en' ? "Experience Y'ana" : "Découvrez Y'ana"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            {locale === 'en' 
              ? "A simple, secure mobile app designed for the modern Cameroonian household." 
              : "Une application mobile simple et sécurisée conçue pour les foyers camerounais modernes."}
          </p>
        </div>

        {/* Mobile Screens Grid / Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto pb-8 lg:grid lg:grid-cols-4 lg:overflow-visible gap-12 snap-x snap-mandatory hide-scrollbar">
          
          {/* SCREEN 1: HOME */}
          <DeviceFrame label={locale === 'en' ? "Home Screen" : "Accueil"}>
            <div className="bg-white h-full flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-gray-50 pt-10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-gray-900">Akwa, Douala</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    readOnly
                    placeholder={locale === 'en' ? "Find a nanny, cleaner..." : "Trouver une nounou..."}
                    className="w-full h-10 bg-gray-50 border-none rounded-xl pl-10 text-[10px] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                    { icon: Baby, color: 'bg-blue-50 text-blue-600', label: 'Nanny' },
                    { icon: Eraser, color: 'bg-orange-50 text-orange-600', label: 'Cleaner' },
                    { icon: Heart, color: 'bg-red-50 text-red-600', label: 'Baby' },
                    { icon: HomeIcon, color: 'bg-green-50 text-green-600', label: 'House' }
                  ].map((cat, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center`}>
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[8px] font-bold uppercase">{cat.label}</span>
                    </div>
                  ))}
                </div>
                <h3 className="text-xs font-black uppercase tracking-tighter mb-3">{locale === 'en' ? "Recommended" : "Recommandés"}</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-100 rounded-2xl flex gap-3 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black">Prisca K.</span>
                        <div className="flex items-center gap-0.5 text-accent">
                          <Star className="w-2 h-2 fill-current" />
                          <span className="text-[8px] font-black">4.9</span>
                        </div>
                      </div>
                      <p className="text-[8px] text-gray-500 mb-2">2,500 FCFA/hr • 1.2km</p>
                      <button className="text-[8px] font-black text-primary uppercase">{locale === 'en' ? "View Profile" : "Voir profil"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DeviceFrame>

          {/* SCREEN 2: BOOKING CONFIRMATION */}
          <DeviceFrame label={locale === 'en' ? "Confirmation" : "Confirmation"}>
            <div className="bg-primary h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center mb-6 shadow-xl border border-white/30">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">{locale === 'en' ? "Booking Confirmed" : "Réservation Confirmée"}</h3>
              <p className="text-[10px] text-blue-100 mb-8">{locale === 'en' ? "Prisca will arrive at your location at the scheduled time." : "Prisca arrivera chez vous à l'heure prévue."}</p>
              
              <div className="w-full bg-white rounded-2xl p-4 text-left shadow-2xl mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100" />
                  <div>
                    <p className="text-[10px] font-black text-gray-900 leading-none">Prisca K.</p>
                    <p className="text-[8px] text-gray-500">{locale === 'en' ? "House Cleaning" : "Ménage"}</p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-gray-50 pt-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span className="text-[9px] font-bold">Mon, Oct 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" />
                    <span className="text-[9px] font-bold">08:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-2">
                <button className="w-full py-3 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {locale === 'en' ? "Message Worker" : "Envoyer message"}
                </button>
                <button className="w-full py-3 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                  {locale === 'en' ? "Details" : "Détails"}
                </button>
              </div>
            </div>
          </DeviceFrame>

          {/* SCREEN 3: CHAT */}
          <DeviceFrame label={locale === 'en' ? "Messaging" : "Messagerie"}>
            <div className="bg-white h-full flex flex-col">
              <div className="p-4 flex items-center gap-3 border-b border-gray-50 pt-10">
                <div className="w-8 h-8 rounded-full bg-blue-100" />
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-900">Prisca K.</p>
                  <p className="text-[8px] text-green-500 font-bold">{locale === 'en' ? "Online" : "En ligne"}</p>
                </div>
                <div className="flex gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <Navigation className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-[9px] max-w-[80%] font-medium">
                  {locale === 'en' ? "Hello Marie! I am confirmed for Monday at 8 AM." : "Bonjour Marie ! Je confirme pour lundi à 8h."}
                </div>
                <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none text-[9px] max-w-[80%] ml-auto font-medium shadow-md">
                  {locale === 'en' ? "Perfect! I will share the exact location now." : "Parfait ! Je vous envoie ma localisation."}
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-[9px] max-w-[80%] font-medium">
                  {locale === 'en' ? "Thank you. See you then!" : "Merci. À lundi !"}
                </div>
              </div>
              <div className="p-4 border-t border-gray-50 flex gap-2">
                <div className="flex-1 h-10 bg-gray-50 rounded-xl px-4 flex items-center text-[9px] text-gray-400">
                  {locale === 'en' ? "Type a message..." : "Votre message..."}
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                  <Send className="w-4 h-4" />
                </div>
              </div>
            </div>
          </DeviceFrame>

          {/* SCREEN 4: PROFILE */}
          <DeviceFrame label={locale === 'en' ? "Worker Profile" : "Profil"}>
            <div className="bg-white h-full flex flex-col overflow-hidden">
              <div className="h-32 bg-blue-100 relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-3 -mt-8 relative z-10 bg-white rounded-t-[1.5rem] flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">Prisca K.</h3>
                    <p className="text-[9px] text-gray-500 font-bold">{locale === 'en' ? "Professional Nanny" : "Nounou Professionnelle"}</p>
                  </div>
                  <div className="flex items-center gap-1 p-2 bg-orange-50 rounded-xl">
                    <Star className="w-3 h-3 text-accent fill-current" />
                    <span className="text-[9px] font-black text-accent">4.9</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 p-2 rounded-xl text-center">
                    <p className="text-[7px] text-gray-400 uppercase font-black">Exp</p>
                    <p className="text-[9px] font-black text-primary">5 yrs</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl text-center">
                    <p className="text-[7px] text-gray-400 uppercase font-black">Jobs</p>
                    <p className="text-[9px] font-black text-primary">124</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl text-center">
                    <p className="text-[7px] text-gray-400 uppercase font-black">ID</p>
                    <CheckCircle2 className="w-3 h-3 text-green-500 mx-auto" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400">{locale === 'en' ? "About" : "À propos"}</h4>
                  <p className="text-[9px] text-gray-600 leading-relaxed font-medium">
                    {locale === 'en' 
                      ? "Certified nanny with first-aid training. Specialized in child development and infant care." 
                      : "Nounou certifiée avec formation en secourisme. Spécialisée dans l'éveil des enfants."}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="text-[8px] text-blue-500 hover:underline cursor-pointer">
                      {locale === 'en' ? 'Terms' : 'Conditions'}
                    </button>
                    <span className="text-[8px] text-gray-400">•</span>
                    <button className="text-[8px] text-blue-500 hover:underline cursor-pointer">
                      {locale === 'en' ? 'Privacy' : 'Confidentialité'}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-auto">
                  <button className="w-full py-3 bg-accent text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                    {locale === 'en' ? "Book Prisca" : "Réserver Prisca"}
                  </button>
                  <button className="w-full py-3 border-2 border-primary text-primary rounded-2xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all">
                    {locale === 'en' ? "Contact" : "Contacter"}
                  </button>
                </div>
              </div>
            </div>
          </DeviceFrame>

        </div>
      </div>
    </section>
  );
}

function DeviceFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-6 snap-center shrink-0">
      <div className="w-[240px] h-[500px] bg-gray-900 rounded-[2.5rem] border-[6px] border-gray-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative p-1">
        <div className="bg-white h-full w-full rounded-[2rem] overflow-hidden">
          {children}
        </div>
        {/* Notch/Camera */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-800 rounded-b-xl z-20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gray-700 mr-2" />
          <div className="w-6 h-1 bg-gray-700 rounded-full" />
        </div>
      </div>
      <span className="font-black text-gray-900 uppercase tracking-widest text-xs">{label}</span>
    </div>
  );
}
