import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Award, Users, Globe2, Lightbulb } from "lucide-react";
import config from "../config";

// Icon mapping for dynamic highlights
const iconMap = {
  Award: Award,
  Users: Users,
  Globe2: Globe2,
  Lightbulb: Lightbulb,
};

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Dynamic data state
  const [aboutData, setAboutData] = useState({
    badge: "About Us",
    heading: {
      line1: "Your Worldwide Partner",
      line2: "in Digital Success"
    },
    description: "Based in the thriving metropolis of Noida (Delhi NCR), India, NIHKARSH TECHNOLOGY stands out as a shining example of digital marketing excellence, serving both India and international markets. From dynamic branding to creative website building and laser-focused marketing strategies, we specialize in comprehensive digital marketing services.",
    image1: "/images/about-image-1.webp",
    image2: "/images/about-image2-1.webp",
    experienceYears: "3+",
    highlights: [
      { icon: "Award", text: "3+ Years Experience" },
      { icon: "Users", text: "50+ Brands Created" },
      { icon: "Globe2", text: "Global Presence" },
      { icon: "Lightbulb", text: "Innovative Solutions" },
    ],
    features: [
      "Strategic Brand Development",
      "Data-Driven Marketing Campaigns",
      "Custom Web Solutions",
      "Social Media Management",
      "SEO & Content Marketing",
      "Performance Analytics",
    ],
    button: {
      text: "Learn More About Us",
      link: "#contact"
    }
  });

  // Fetch about data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/about/public`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setAboutData(prev => ({
              ...prev,
              ...data,
              heading: data.heading || prev.heading,
              highlights: data.highlights?.length ? data.highlights : prev.highlights,
              features: data.features?.length ? data.features : prev.features,
              button: data.button || prev.button,
            }));
          }
        }
      } catch (error) {
        console.log('Using default about data');
      }
    };
    fetchAboutData();
  }, []);

  // Map highlights with icons
  const highlights = aboutData.highlights.map(h => ({
    icon: iconMap[h.icon] || Award,
    text: h.text
  }));

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left - Images */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <motion.div
                style={{ y: imageY }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={aboutData.image1 || "/images/about-image-1.webp"}
                  alt="About Nihkarsh Technology"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-10 -right-10 w-64 h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20"
              >
                <img
                  src={aboutData.image2 || "/images/about-image2-1.webp"}
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-6 -left-6 z-30"
              >
                <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-slate-100">
                  <p className="text-4xl font-bold gradient-text">{aboutData.experienceYears || "3+"}</p>
                  <p className="text-sm text-slate-500">Years Experience</p>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary-500/30 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary-500/30 rounded-br-3xl" />
              </div>
            </motion.div>
          </div>

          {/* Right - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                {aboutData.badge || "About Us"}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
            >
              <span className="text-slate-800">{aboutData.heading?.line1 || "Your Worldwide Partner"}</span>
              <br />
              <span className="gradient-text">{aboutData.heading?.line2 || "in Digital Success"}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg leading-relaxed mb-8"
            >
              {aboutData.description}
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500/10 to-primary-600/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {aboutData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-sm text-slate-600">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href={aboutData.button?.link || "#contact"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
              >
                {aboutData.button?.text || "Learn More About Us"}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
