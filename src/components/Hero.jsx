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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Animated gradient orbs - smaller on mobile */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary-500/20 rounded-full blur-[80px] md:blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-secondary-500/20 rounded-full blur-[80px] md:blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative circles - hidden on mobile */}
      <div className="hidden md:block hero-circle w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div
        className="hidden md:block hero-circle w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="hidden md:block hero-circle w-[900px] h-[900px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20"
      >
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass mb-6 md:mb-8"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary-400" />
              <span className="text-xs md:text-sm font-medium text-gray-300">
                {heroData.badge}
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="overflow-hidden mb-4 md:mb-6">
              <motion.h1
                ref={textRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight"
              >
                <span className="block text-white">
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
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 px-2 md:px-0"
            >
              {heroData.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12 px-4 sm:px-0"
            >
              <motion.a
                href={heroData.primaryButton?.link || "#contact"}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(237, 116, 16, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm md:text-base font-semibold rounded-full transition-all duration-300"
              >
                {heroData.primaryButton?.text || "Get Free Consultation"}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href={heroData.secondaryButton?.link || "#services"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 glass text-white text-sm md:text-base font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
                {heroData.secondaryButton?.text || "Explore Services"}
              </motion.a>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap gap-2 md:gap-4 justify-center lg:justify-start"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-dark-700/50 border border-dark-600"
                >
                  <feature.icon className="w-3 h-3 md:w-4 md:h-4 text-primary-400" />
                  <span className="text-xs md:text-sm text-gray-300">
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
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10">
                  <img
                    src={heroData.heroImage || "/images/header-home4.webp"}
                    alt="Digital Marketing"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Floating cards - adjusted for mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -bottom-3 -left-2 md:-bottom-6 md:-left-6 z-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="glass px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg md:text-2xl font-bold text-white">
                        {heroData.stats?.[0]?.value || "85%"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">
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
                className="absolute -top-3 -right-2 md:-top-6 md:-right-6 z-20"
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="glass px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-primary-500 to-orange-500 flex items-center justify-center">
                      <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg md:text-2xl font-bold text-white">
                        {heroData.stats?.[1]?.value || "50+"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">
                        {heroData.stats?.[1]?.label || "Happy Clients"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative elements - smaller on mobile */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 right-0 w-36 h-36 md:w-72 md:h-72 bg-primary-500/30 rounded-full blur-[60px] md:blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-36 h-36 md:w-72 md:h-72 bg-secondary-500/30 rounded-full blur-[60px] md:blur-[100px]" />
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
        className="hidden sm:block absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs md:text-sm text-gray-500">
            Scroll to explore
          </span>
          <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
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
