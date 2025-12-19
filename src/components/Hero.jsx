import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";
import gsap from "gsap";
import config from "../config";

// Icon mapping for dynamic features
const iconMap = {
  TrendingUp: TrendingUp,
  Users: Users,
  Globe: Globe,
};

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  // Dynamic data state
  const [heroData, setHeroData] = useState({
    badge: "#1 Digital Marketing Agency in Noida",
    heading: {
      line1: "Unlock Your",
      line2: "Brand's Potential"
    },
    subtitle: "Innovative digital marketing strategies that transform businesses. From SEO to Social Media, we deliver measurable results.",
    primaryButton: { text: "Get Free Consultation", link: "#contact" },
    secondaryButton: { text: "Explore Services", link: "#services" },
    heroImage: "/images/header-home4.webp",
    features: [
      { icon: "TrendingUp", text: "Growth Focused" },
      { icon: "Users", text: "50+ Brands" },
      { icon: "Globe", text: "Global Reach" },
    ],
    stats: [
      { value: "85%", label: "Traffic Growth" },
      { value: "50+", label: "Happy Clients" }
    ]
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Fetch hero data from API
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/hero/public`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setHeroData(prev => ({
              ...prev,
              ...data,
              heading: data.heading || prev.heading,
              features: data.features?.length ? data.features : prev.features,
              stats: data.stats?.length ? data.stats : prev.stats,
            }));
          }
        }
      } catch (error) {
        console.log('Using default hero data');
      }
    };
    fetchHeroData();
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }
  }, [heroData]);

  // Map features with icons
  const features = heroData.features.map(f => ({
    icon: iconMap[f.icon] || TrendingUp,
    text: f.text
  }));

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-slate-50/30"
      style={{ paddingTop: '70px', maxHeight: '100vh' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Animated gradient orbs - smaller on mobile */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary-500/10 rounded-full blur-[60px] md:blur-[80px]"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-secondary-500/10 rounded-full blur-[60px] md:blur-[80px]"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative circles - hidden on mobile */}
      <div className="hidden md:block hero-circle w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div
        className="hidden md:block hero-circle w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="hidden md:block hero-circle w-[650px] h-[650px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full glass mb-3 md:mb-4"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary-500" />
              <span className="text-xs md:text-sm font-medium text-slate-600">
                {heroData.badge}
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="overflow-hidden mb-2 md:mb-4">
              <motion.h1
                ref={textRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-display font-bold leading-tight"
              >
                <span className="block text-slate-800">
                  {(heroData.heading?.line1 || "Unlock Your").split("").map((char, i) => (
                    <span key={i} className="char inline-block">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
                <span className="block gradient-text mt-1 md:mt-2">
                  {(heroData.heading?.line2 || "Brand's Potential").split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                      {word.split("").map((char, i) => (
                        <span key={`${wordIndex}-${i}`} className="char inline-block">
                          {char}
                        </span>
                      ))}
                      {wordIndex < (heroData.heading?.line2 || "Brand's Potential").split(" ").length - 1 && (
                        <span className="char inline-block">&nbsp;</span>
                      )}
                    </span>
                  ))}
                </span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-600 mb-4 md:mb-5 max-w-lg mx-auto lg:mx-0 px-2 md:px-0"
            >
              {heroData.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center lg:justify-start mb-4 md:mb-6 px-4 sm:px-0"
            >
              <motion.a
                href={heroData.primaryButton?.link || "#contact"}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs md:text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-primary-600/25"
              >
                {heroData.primaryButton?.text || "Get Free Consultation"}
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href={heroData.secondaryButton?.link || "#services"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white border-2 border-slate-200 text-slate-700 text-xs md:text-sm font-semibold rounded-full hover:border-primary-600 hover:text-primary-700 transition-all duration-300 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-600" />
                {heroData.secondaryButton?.text || "Explore Services"}
              </motion.a>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-white/80 border border-slate-200 shadow-sm"
                >
                  <feature.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary-500" />
                  <span className="text-xs text-slate-600">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative order-1 lg:order-2 max-h-[50vh] lg:max-h-[60vh]"
          >
            <div className="relative">
              {/* Main image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl shadow-primary-500/10 border border-slate-200/50">
                  <img
                    src={heroData.heroImage || "/images/header-home4.webp"}
                    alt="Digital Marketing"
                    className="w-full h-auto max-h-[45vh] lg:max-h-[55vh] object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Floating cards - adjusted for mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 z-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white px-2.5 py-1.5 md:px-4 md:py-3 rounded-lg md:rounded-xl shadow-xl border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base md:text-xl font-bold text-slate-800">
                        {heroData.stats?.[0]?.value || "85%"}
                      </p>
                      <p className="text-[10px] md:text-xs text-slate-500">
                        {heroData.stats?.[0]?.label || "Traffic Growth"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-20"
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white px-2.5 py-1.5 md:px-4 md:py-3 rounded-lg md:rounded-xl shadow-xl border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-primary-600 to-secondary-500 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base md:text-xl font-bold text-slate-800">
                        {heroData.stats?.[1]?.value || "50+"}
                      </p>
                      <p className="text-[10px] md:text-xs text-slate-500">
                        {heroData.stats?.[1]?.label || "Happy Clients"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative elements - smaller on mobile */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 right-0 w-28 h-28 md:w-48 md:h-48 bg-primary-500/20 rounded-full blur-[40px] md:blur-[60px]" />
                <div className="absolute bottom-0 left-0 w-28 h-28 md:w-48 md:h-48 bg-secondary-500/20 rounded-full blur-[40px] md:blur-[60px]" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden sm:block absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs md:text-sm text-slate-400">
            Scroll to explore
          </span>
          <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
