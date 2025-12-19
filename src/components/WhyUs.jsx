import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Zap,
  Target,
  Users,
  Award,
  HeartHandshake,
} from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Trusted Expertise",
    description:
      "Over 3 years of experience delivering exceptional digital marketing solutions for businesses worldwide.",
    color: "from-primary-500 to-indigo-500",
  },
  {
    icon: Zap,
    title: "Fast Results",
    description:
      "Our data-driven strategies deliver quick, measurable results that accelerate your business growth.",
    color: "from-primary-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Targeted Approach",
    description:
      "Precision-focused campaigns that reach your ideal audience at the right time and place.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "Our team of skilled professionals works closely with you to understand and achieve your goals.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Award,
    title: "Google Partner",
    description:
      "Certified Google Partner with expertise in managing high-performance advertising campaigns.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: HeartHandshake,
    title: "Client-Centric",
    description:
      "Your success is our priority. We work transparently to meet and exceed your expectations.",
    color: "from-secondary-500 to-teal-500",
  },
];

const WhyUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-slate-200 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                Why Nihkarsh Technology
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
            >
              <span className="text-slate-800">Why Choose Us for Your</span>
              <br />
              <span className="gradient-text">Digital Success Journey?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg leading-relaxed mb-8"
            >
              Utilize NIHKARSH TECHNOLOGY to explore the digital realm. We
              specialize in a wide range of digital marketing services - from
              dynamic branding to creative website building and laser-focused
              marketing strategies.
            </motion.p>

            {/* Image with overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/image1-home4.webp"
                alt="Why Choose Us"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Floating stats */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg"
                >
                  <p className="text-2xl font-bold text-slate-800">50+</p>
                  <p className="text-xs text-slate-500">Brands Created</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg"
                >
                  <p className="text-2xl font-bold text-slate-800">100%</p>
                  <p className="text-xs text-slate-500">Client Satisfaction</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right - Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="relative h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-primary-300 transition-all duration-500 overflow-hidden">
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <reason.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary-500 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
