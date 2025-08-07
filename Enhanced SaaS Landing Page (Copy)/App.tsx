import svgPaths from "./imports/svg-yf65z1l914";
import imgBankingDashboardDashboardPngByAlexArutuynov1 from "figma:asset/c87f37e643157e0f785a046a0bb55614574dfa45.png";
import imgPngwingCom22 from "figma:asset/42f729c09cb9ef224338ff14d81b39d9f75d2b5f.png";
import imgMediumShotMaleFlightAttendantPosing1 from "figma:asset/92571690f80ae2aa113e6eb1df0bffebf5eae04f.png";
import imgVectorIllustrationOfADigitalTabletSlightlyT1RemovebgPreview3 from "figma:asset/5257a4cb413b83942a8e236977b59f5cab0e580d.png";
import img10791 from "figma:asset/e60c193e2fc84e4fc3df3045445cf897d98c41e7.png";
import imgImage1 from "figma:asset/60099bcd289e8438115026c8b8d3875cf6325617.png";
import imgMediumShotMaleFlightAttendantPosingRemovebgPreview1 from "figma:asset/c8e2349d8b6377ea5def0d4c391a8137bbca6480.png";
import imgInvoInvoicingWebApplication2 from "figma:asset/8e27989417a963e006b69eb3cee3f1dc57489a52.png";
import { ImageWithFallback } from './components/figma/ImageWithFallback';
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

// Animated Counter Component
function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
      if (numericValue) {
        let start = 0;
        const increment = numericValue / (duration * 60);
        const timer = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 1000 / 60);

        return () => clearInterval(timer);
      }
    }
  }, [inView, isVisible, value, duration]);

  const formatCount = (num: number) => {
    if (value.includes('₦')) {
      if (num >= 1000000000) return `₦${(num / 1000000000).toFixed(1)}B+`;
      if (num >= 1000000) return `₦${(num / 1000000).toFixed(1)}M+`;
      if (num >= 1000) return `₦${(num / 1000).toFixed(1)}K+`;
      return `₦${Math.round(num)}`;
    }
    if (value.includes('%')) return `${num.toFixed(1)}%`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
    return Math.round(num).toString();
  };

  return <span ref={ref}>{isVisible ? formatCount(count) : value}</span>;
}

// Mobile Navigation Component
function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? '0%' : '100%' }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Lendericonsvg1 />
            <Lendertexticon1 />
          </div>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="space-y-6">
          <a href="#features" className="block text-lg text-gray-700 hover:text-[#143ad0] transition-colors">Features</a>
          <a href="#pricing" className="block text-lg text-gray-700 hover:text-[#143ad0] transition-colors">Pricing</a>
          <a href="#about" className="block text-lg text-gray-700 hover:text-[#143ad0] transition-colors">About Us</a>
          <a href="#help" className="block text-lg text-gray-700 hover:text-[#143ad0] transition-colors">Help Center</a>
          
          <div className="pt-6 space-y-4">
            <button className="w-full text-center text-gray-700 hover:text-[#143ad0] transition-colors text-lg">Sign In</button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#020c2f] to-[#143ad0] text-white py-3 px-6 rounded-xl font-medium text-lg shadow-lg"
            >
              Get Started
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.div>
  );
}

// Pricing Toggle Component
function PricingToggle({ isYearly, onChange }: { isYearly: boolean; onChange: (isYearly: boolean) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center justify-center mb-12"
    >
      <div className="bg-gray-100 p-1 rounded-xl flex relative">
        <motion.div
          layout
          className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
          style={{
            left: isYearly ? '50%' : '4px',
            right: isYearly ? '4px' : '50%',
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
        
        <button
          onClick={() => onChange(false)}
          className={`relative z-10 px-8 py-3 rounded-lg font-medium transition-all ${
            !isYearly ? 'text-[#020c2f]' : 'text-gray-600 hover:text-[#020c2f]'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onChange(true)}
          className={`relative z-10 px-8 py-3 rounded-lg font-medium transition-all ${
            isYearly ? 'text-[#020c2f]' : 'text-gray-600 hover:text-[#020c2f]'
          }`}
        >
          Yearly
          {isYearly && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
            >
              20% off
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Enhanced Pricing Card Component
function PricingCard({
  name,
  description,
  monthlyPrice,
  yearlyPrice,
  isYearly,
  features,
  isPopular,
  ctaText,
  ctaVariant,
  index
}: {
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  isYearly: boolean;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary';
  index: number;
}) {
  const price = isYearly ? yearlyPrice : monthlyPrice;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${
        isPopular ? 'ring-2 ring-[#143ad0] scale-105' : ''
      }`}
    >
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
        >
          <span className="bg-gradient-to-r from-[#143ad0] to-[#002bd9] text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
            ⭐ Most Popular
          </span>
        </motion.div>
      )}
      
      <div className="text-center">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-[#001360] mb-3"
        >
          {name}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8 text-base leading-relaxed"
        >
          {description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-5xl font-bold bg-gradient-to-r from-[#001360] to-[#143ad0] bg-clip-text text-transparent">
              {price}
            </span>
            {price !== 'Custom' && (
              <span className="text-gray-500 ml-2 text-lg">/{isYearly ? 'year' : 'month'}</span>
            )}
          </div>
          {isYearly && price !== 'Custom' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-green-600 font-medium"
            >
              💰 Save 20% with yearly billing
            </motion.p>
          )}
          {price === 'Custom' && (
            <p className="text-sm text-gray-500">Tailored to your needs</p>
          )}
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: ctaVariant === 'primary' 
              ? "0 10px 30px rgba(20, 58, 208, 0.4)" 
              : "0 10px 30px rgba(2, 12, 47, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 mb-8 text-base ${
            ctaVariant === 'primary'
              ? 'bg-gradient-to-r from-[#020c2f] to-[#143ad0] text-white shadow-lg'
              : 'bg-white text-[#020c2f] border-2 border-[#020c2f] hover:bg-[#020c2f] hover:text-white'
          }`}
        >
          {ctaText}
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4 text-left"
        >
          {features.map((feature, featureIndex) => (
            <motion.div 
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + featureIndex * 0.1 }}
              className="flex items-start"
            >
              <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-base">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Enhanced Metrics Card Component
function MetricCard({ icon: Icon, value, label, description, index }: {
  icon: any;
  value: string;
  label: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        boxShadow: "0 20px 40px rgba(20, 58, 208, 0.1)"
      }}
      className="text-center group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#f6ffc8] to-[#a9baff] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
      >
        <Icon className="w-10 h-10 text-[#143ad0]" />
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ delay: index * 0.2 + 0.3 }}
        className="text-4xl font-bold text-[#001360] mb-3"
      >
        <AnimatedCounter value={value} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.2 + 0.5 }}
        className="text-xl font-semibold text-[#002bd9] mb-3"
      >
        {label}
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.2 + 0.7 }}
        className="text-gray-600 text-base leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

// Enhanced Client Logo Component
function ClientLogo({ name, logo, index }: { name: string; logo?: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
      }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
    >
      <div className="h-12 flex items-center justify-center">
        {logo ? (
          <ImageWithFallback src={logo} alt={name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
        ) : (
          <div className="text-2xl font-bold text-gray-400 group-hover:text-[#143ad0] transition-colors duration-300">
            {name}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Enhanced Feature Card Component
function FeatureCard({ title, description, icon, index }: {
  title: string;
  description: string;
  icon: any;
  index: number;
}) {
  const Icon = icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        boxShadow: "0 25px 50px rgba(20, 58, 208, 0.15)"
      }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 bg-gradient-to-br from-[#143ad0] to-[#002bd9] rounded-2xl flex items-center justify-center mb-6 shadow-lg"
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      
      <h3 className="text-xl font-bold text-[#001360] mb-4 group-hover:text-[#143ad0] transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 text-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// Testimonial Card Component
function TestimonialCard({ quote, author, role, company, rating, index }: {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
    >
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-[#143ad0] to-[#002bd9] rounded-full flex items-center justify-center text-white font-bold mr-4">
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-[#001360]">{author}</div>
          <div className="text-gray-600">{role} at {company}</div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Enhanced Landing Page Component
export default function EnhancedLandingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses getting started with lending",
      monthlyPrice: "₦25,000",
      yearlyPrice: "₦240,000",
      features: [
        "Up to 100 loans per month",
        "Basic KYC verification",
        "Email support",
        "Standard analytics dashboard",
        "Mobile app access",
        "Basic loan workflows",
        "Customer portal"
      ],
      ctaText: "Start Now",
      ctaVariant: "secondary" as const
    },
    {
      name: "Growth",
      description: "Ideal for growing lending businesses ready to scale",
      monthlyPrice: "₦75,000",
      yearlyPrice: "₦720,000",
      features: [
        "Up to 500 loans per month",
        "Advanced KYC & credit scoring",
        "Priority support",
        "Advanced analytics & reporting",
        "Team management (up to 10 users)",
        "Custom loan products",
        "API access",
        "Automated workflows",
        "WhatsApp integration"
      ],
      isPopular: true,
      ctaText: "Start Now",
      ctaVariant: "primary" as const
    },
    {
      name: "Scale",
      description: "For established lending institutions with high volume",
      monthlyPrice: "₦150,000",
      yearlyPrice: "₦1,440,000",
      features: [
        "Unlimited loans",
        "Full KYC suite & AI scoring",
        "Dedicated account manager",
        "White-label solution",
        "Unlimited team members",
        "Advanced integrations",
        "Custom reporting",
        "24/7 phone support",
        "Compliance tools",
        "Multi-branch support"
      ],
      ctaText: "Start Now",
      ctaVariant: "secondary" as const
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations with specific needs",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      features: [
        "Everything in Scale",
        "Custom development",
        "On-premise deployment",
        "SLA guarantees",
        "Custom integrations",
        "Dedicated infrastructure",
        "Training & onboarding",
        "Regulatory compliance support",
        "Custom workflows",
        "Dedicated support team"
      ],
      ctaText: "Contact Sales",
      ctaVariant: "secondary" as const
    }
  ];

  const metrics = [
    {
      icon: TrendingUp,
      value: "₦12000000000",
      label: "Loans Processed",
      description: "Total value of loans successfully disbursed through our platform"
    },
    {
      icon: Users,
      value: "6000",
      label: "Active Merchants",
      description: "Lending businesses growing and scaling with our platform"
    },
    {
      icon: Zap,
      value: "99.8",
      label: "Uptime",
      description: "Reliable platform performance you can always count on"
    },
    {
      icon: Shield,
      value: "99.7",
      label: "Success Rate",
      description: "Loans successfully processed without any technical issues"
    }
  ];

  const clientLogos = [
    { name: "FinTech Pro" },
    { name: "LendMax" },
    { name: "QuickCash" },
    { name: "MoneyFlow" },
    { name: "CreditBridge" },
    { name: "LoanHub" },
    { name: "FastFunds" },
    { name: "CashAdvance" }
  ];

  const features = [
    {
      title: "Smart Onboarding",
      description: "Streamlined KYC process with automated document verification and risk assessment",
      icon: Users
    },
    {
      title: "Instant Approval",
      description: "AI-powered credit scoring for faster loan decisions and improved approval rates",
      icon: Zap
    },
    {
      title: "Secure Processing",
      description: "Bank-level security with end-to-end encryption and compliance monitoring",
      icon: Shield
    },
    {
      title: "Real-time Analytics",
      description: "Comprehensive dashboards with insights to optimize your lending operations",
      icon: BarChart3
    },
    {
      title: "Multi-channel Support",
      description: "Integrated customer support across web, mobile, and WhatsApp channels",
      icon: Globe
    },
    {
      title: "Automated Collections",
      description: "Smart repayment reminders and automated collection workflows",
      icon: Clock
    }
  ];

  const testimonials = [
    {
      quote: "Lender transformed our lending business. We've processed over ₦500M in loans with 95% customer satisfaction.",
      author: "Sarah Johnson",
      role: "CEO",
      company: "QuickFunds Nigeria",
      rating: 5
    },
    {
      quote: "The platform reduced our loan processing time from 3 days to 30 minutes. Game changer!",
      author: "David Okafor",
      role: "Operations Manager",
      company: "FastCash Limited",
      rating: 5
    },
    {
      quote: "Customer support is exceptional. They helped us customize workflows to match our business needs perfectly.",
      author: "Fatima Ahmed",
      role: "Founder",
      company: "MicroLend Plus",
      rating: 5
    }
  ];

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
                className="text-gray-700 hover:text-[#143ad0] transition-colors font-medium"
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(20, 58, 208, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
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

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

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

      {/* Enhanced Metrics Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001360] mb-6">
              Trusted by businesses{' '}
              <span className="bg-gradient-to-r from-[#143ad0] to-[#002bd9] bg-clip-text text-transparent">
                of all sizes
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of lending businesses who trust our platform to power their growth and success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001360] mb-6">
              <span className="bg-gradient-to-r from-[#143ad0] to-[#002bd9] bg-clip-text text-transparent">
                Simplify and scale
              </span>{' '}
              your operations
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From client onboarding to repayment tracking, our comprehensive system handles everything. 
              Get real-time insights, automated workflows, and the tools you need to grow faster.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001360] mb-6">
              What our{' '}
              <span className="bg-gradient-to-r from-[#143ad0] to-[#002bd9] bg-clip-text text-transparent">
                customers say
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. See how lending businesses are transforming with our platform.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001360] mb-6">
              Simple, transparent{' '}
              <span className="bg-gradient-to-r from-[#143ad0] to-[#002bd9] bg-clip-text text-transparent">
                pricing
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              No hidden fees. No surprises. Start small and scale as you grow with our flexible pricing plans.
            </p>
          </motion.div>
          
          <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                isYearly={isYearly}
                index={index}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-gray-700 mb-6 text-lg">
                All plans include 24/7 support, regular updates, security monitoring, and 99.9% uptime SLA
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Free migration support
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  14-day money-back guarantee
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  No setup fees
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-6 text-[#143ad0] hover:text-[#002bd9] transition-colors font-medium"
              >
                Need a custom plan? Contact our sales team →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Client Logos Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#001360] mb-6">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-[#143ad0] to-[#002bd9] bg-clip-text text-transparent">
                forward-thinking
              </span>{' '}
              lenders
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of lending businesses who have transformed their operations with our platform
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {clientLogos.map((client, index) => (
              <ClientLogo key={index} {...client} index={index} />
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 text-lg">
              Ready to join them?{' '}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-[#143ad0] hover:text-[#002bd9] transition-colors font-semibold underline"
              >
                Start your free trial today
              </motion.button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#020c2f] via-[#143ad0] to-[#002bd9] relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"
        />
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to launch your loan platform?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Experience a fast, stress-free setup process designed to get your loan business live in record time—fully customized to your brand, optimized for scale, and backed by hands-on support every step of the way.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#020c2f] px-10 py-4 rounded-xl font-semibold text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
            >
              <Play className="mr-2 w-5 h-5" />
              Book Free Demo
              <span className="ml-2 text-sm opacity-70">See it in action</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white border-2 border-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#020c2f] transition-all duration-300 flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-8 text-blue-200"
          >
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Setup in under 24 hours
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Cancel anytime
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-[#001360] text-white relative overflow-hidden">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#143ad0]/20 to-transparent rounded-full transform translate-x-48 -translate-y-48"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-2 mb-6">
                <Lendericonsvg1 className="text-white" />
                <Lendertexticon1 className="text-white" />
              </div>
              <p className="text-blue-200 mb-8 max-w-md text-lg leading-relaxed">
                Empowering lending businesses with cutting-edge technology to scale operations and deliver exceptional customer experiences.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[Twitter, Facebook, Linkedin, Instagram].map((Icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                {['Home', 'Features', 'Pricing', 'About Us', 'Careers', 'Blog'].map((item) => (
                  <li key={item}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-blue-200 hover:text-white transition-colors text-base"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Product */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6">Product</h3>
              <ul className="space-y-4">
                {['Dashboard', 'White-label', 'API', 'Integrations', 'Mobile App', 'Analytics'].map((item) => (
                  <li key={item}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-blue-200 hover:text-white transition-colors text-base"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Support & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6">Get in touch</h3>
              
              <div className="space-y-4 mb-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-blue-200 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  <span className="text-base">hello@lender.com</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-blue-200 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="text-base">+234 123 456 7890</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start text-blue-200 hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5 mr-3 mt-1" />
                  <span className="text-base">Victoria Island, Lagos, Nigeria</span>
                </motion.div>
              </div>
              
              {/* Newsletter */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Stay updated</h4>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-l-xl bg-blue-800 text-white placeholder-blue-300 border border-blue-700 focus:outline-none focus:border-blue-500 text-base"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#143ad0] px-6 py-3 rounded-r-xl hover:bg-[#002bd9] transition-colors shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-blue-200 text-base">
              © 2025 Lender. All rights reserved.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  href="#"
                  className="text-blue-200 hover:text-white text-base transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}