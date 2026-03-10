"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import heroImage from "@/assets/hero.png";
import { Sparkles, Shield, Users, CheckCircle, Star, ArrowRight, Zap, Heart } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState, useEffect } from "react";

export function Hero() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const scrollToSurvey = (type: 'family' | 'worker') => {
    const surveyElement = document.getElementById('market-survey');
    if (surveyElement) {
      surveyElement.scrollIntoView({ behavior: 'smooth' });
      // Event to trigger survey type selection can be added here
      window.dispatchEvent(new CustomEvent('setSurveyType', { detail: type }));
    }
  };

  return (
    <section className="relative min-h-screen pt-10 flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-orange-50/10">
      
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Main Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-orange-600/5" />
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-float" />
        <div className="absolute top-32 right-20 w-3 h-3 bg-orange-400/30 rounded-full animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-blue-300/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-orange-300/20 rounded-full animate-float-delayed" />
        
        {/* Large Animated Blobs */}
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-[120px] animate-blob-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-gradient-to-tl from-orange-400/20 to-orange-600/10 rounded-full blur-[120px] animate-blob-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[30%] right-[15%] w-[30%] h-[30%] bg-gradient-to-br from-purple-400/10 to-pink-400/5 rounded-full blur-[100px] animate-blob-slow" style={{ animationDelay: '6s' }} />
        
        {/* Interactive Mouse-Following Gradient */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none mix-blend-multiply transition-all duration-300 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            filter: 'blur(40px)'
          }}
        />
        
        {/* Grid Pattern with Tech Feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e40af08_1px,transparent_1px),linear-gradient(to_bottom,#1e40af08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_80%,transparent_100%)]" />
        
        {/* Animated Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M 100 200 Q 400 100 700 300" stroke="url(#gradient1)" strokeWidth="2" fill="none" className="animate-draw-path" strokeDasharray="1000" strokeDashoffset="1000" />
          <path d="M 200 400 Q 500 200 800 400" stroke="url(#gradient1)" strokeWidth="1" fill="none" className="animate-draw-path-delayed" strokeDasharray="800" strokeDashoffset="800" />
        </svg>
        
        {/* Verification Scan Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-scan-line" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent animate-scan-line-delayed" />
        </div>
      </div>

      <div className="container mx-auto px-12 md:px-24">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 max-w-5xl mx-auto py-4">
            <div className="lg:w-1/2 text-left py-4">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-100 text-blue-600 text-xs font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
                <div className="relative">
                  <Sparkles className="w-3 h-3" />
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping" />
                </div>
                <span className="font-semibold">{t.hero.badge}</span>
                <div className="ml-2 flex gap-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
              
              {/* Main Title */}
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 leading-[1.1]">
                <span className="animate-fade-in-up inline" style={{ animationDelay: '0.1s' }}>
                  {t.hero.title} <span className="text-blue-600">{t.hero.titleAccent}</span>
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-base text-gray-600 mb-6 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {t.hero.subtitle}
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">{t.hero.trustVerified}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100">
                  <Users className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">{t.hero.familiesCount}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{t.hero.trustRating}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col lg:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Button 
                  size="md" 
                  className="text-base px-6 h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden whitespace-nowrap"
                  onClick={() => scrollToSurvey('family')}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t.hero.ctaHelp}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isHovered && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  )}
                </Button>
                <Button 
                  variant="secondary" 
                  size="md" 
                  className="text-base px-6 h-12 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border-2 border-gray-200 hover:border-orange-300 whitespace-nowrap"
                  onClick={() => scrollToSurvey('worker')}
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    {t.hero.ctaJob}
                  </span>
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="mt-8 flex items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">Rejoint par 200+ familles</span>
              </div>
            </div>

            {/* Hero Image Section */}
            <div className="lg:w-1/2 relative">
              {/* Main Image Container */}
              <div className="relative z-10 max-w-[80%] mx-auto group">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-orange-400/20 to-blue-400/20 rounded-[3rem] blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />
                
                {/* Image */}
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105">
                  <Image 
                    src={heroImage}
                    alt="Y'ana Hero"
                    priority
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-float-slow group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg animate-float-delayed group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                
                <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-float-slow group-hover:scale-110 transition-transform" style={{ animationDelay: '2s' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 50 50 Q 100 20 150 50" stroke="#3B82F6" strokeWidth="2" fill="none" className="animate-draw-path" strokeDasharray="100" strokeDashoffset="100" opacity="0.3" />
                  <path d="M 200 150 Q 250 120 300 150" stroke="#F97316" strokeWidth="2" fill="none" className="animate-draw-path-delayed" strokeDasharray="100" strokeDashoffset="100" opacity="0.3" />
                </svg>
              </div>
              
              {/* Background Orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-orange-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Sparkle Effects */}
              <div className="absolute top-10 right-10 text-yellow-400 animate-twinkle">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute bottom-20 left-10 text-blue-400 animate-twinkle-delayed">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="absolute top-1/3 right-20 text-orange-400 animate-twinkle" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
