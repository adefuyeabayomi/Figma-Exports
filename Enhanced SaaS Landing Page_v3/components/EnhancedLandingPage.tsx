import svgPaths from "../imports/svg-yf65z1l914";
import imgBankingDashboardDashboardPngByAlexArutuynov1 from "figma:asset/c87f37e643157e0f785a046a0bb55614574dfa45.png";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check, Star, ArrowRight, Users, TrendingUp, Shield, Zap, ChevronDown, Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram, Menu, X, Play, CreditCard, Globe, Lock, BarChart3, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

// SVG Components from original design
function Lendericonsvg1({ className = "" }: { className?: string }) {
  return (
    <div className={`h-7 relative shrink-0 w-6 ${className}`} data-name="lendericonsvg 1">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 28"
      >
        <g clipPath="url(#clip0_3_636)" id="lendericonsvg 1">
          <path
            d={svgPaths.p35b21800}
            fill="var(--fill-0, black)"
            id="Vector"
          />
          <path
            d={svgPaths.p35106200}
            fill="var(--fill-0, #43494A)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p1bf93400}
            fill="var(--fill-0, black)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p327000}
            fill="var(--fill-0, #43494A)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p54efe00}
            fill="url(#paint0_linear_3_636)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p227aca00}
            fill="var(--fill-0, #1F778D)"
            id="Vector_6"
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_3_636"
            x1="13.1197"
            x2="10.0624"
            y1="20.0117"
            y2="8.24952"
          >
            <stop />
            <stop offset="1" stopColor="#0C394E" />
          </linearGradient>
          <clipPath id="clip0_3_636">
            <rect fill="white" height="28" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Lendertexticon1({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-3.5 relative shrink-0 w-[63px] ${className}`}
      data-name="lendertexticon 1"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 63 14"
      >
        <g clipPath="url(#clip0_3_576)" id="lendertexticon 1">
          <path d={svgPaths.ped29500} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_3_576">
            <rect fill="white" height="14" width="63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

interface EnhancedLandingPageProps {
  onAuthRequired?: () => void;
  isAuthenticated?: boolean;
}

// Main Enhanced Landing Page Component
export default function EnhancedLandingPage({ onAuthRequired, isAuthenticated }: EnhancedLandingPageProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Lendericonsvg1 />
              <Lendertexticon1 />
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Pricing', 'About Us'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-[#143ad0] transition-colors font-medium"
                >
                  {item}
                </motion.a>
              ))}
              
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-gray-700 hover:text-[#143ad0] transition-colors font-medium"
                >
                  Help Center
                  <ChevronDown className="ml-1 w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAuthRequired}
                className="text-gray-700 hover:text-[#143ad0] transition-colors font-medium"
              >
                {isAuthenticated ? 'Dashboard' : 'Sign In'}
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(20, 58, 208, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onAuthRequired}
                className="bg-gradient-to-r from-[#020c2f] to-[#143ad0] text-white px-6 py-2 rounded-xl font-medium shadow-lg"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div
          style={{ y: scrollY * 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-[#f6ffc8]/20 to-[#a9baff]/20"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001360] leading-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                Launch your own{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-[#143ad0] to-[#002bd9] bg-clip-text text-transparent"
                >
                  branded loan service
                </motion.span>
                {' '}in days, not months
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
              >
                Offer flexible credit to your customers—without building from scratch. 
                Our platform handles everything from KYC to collections, fully branded as your own.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 15px 35px rgba(20, 58, 208, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAuthRequired}
                  className="bg-gradient-to-r from-[#020c2f] to-[#143ad0] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl flex items-center justify-center"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Book Free Demo
                  <span className="ml-2 text-sm opacity-80">No credit card required</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 15px 35px rgba(2, 12, 47, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAuthRequired}
                  className="bg-white text-[#020c2f] border-2 border-[#020c2f] px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#020c2f] hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Try Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 pt-4"
              >
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-[#143ad0] to-[#002bd9] rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="ml-3 text-gray-600">6,000+ merchants trust us</span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5 rating</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-[#f6ffc8] to-[#a9baff] rounded-3xl p-6 shadow-2xl">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={imgBankingDashboardDashboardPngByAlexArutuynov1}
                      alt="Banking Dashboard"
                      className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                  </motion.div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                >
                  ₦
                </motion.div>
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg"
                >
                  <CreditCard className="w-8 h-8 text-[#143ad0]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of the landing page content */}
      {/* ... (you can add more sections here) */}
    </div>
  );
}