import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 via-white to-secondary-50/50" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[150px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[150px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="relative p-8 md:p-16 rounded-3xl overflow-hidden"
        >
          {/* Card background */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xl shadow-2xl" />
          <div className="absolute inset-0 border border-slate-200 rounded-3xl" />

          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 animate-[gradient_3s_ease_infinite]"
              style={{ height: "1px" }}
            />
            <div
              className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 animate-[gradient_3s_ease_infinite]"
              style={{ height: "1px" }}
            />
          </div>

          <div className="relative z-10 text-center">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 mb-8 shadow-lg shadow-primary-500/30"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            >
              <span className="text-slate-800">From Zero to</span>
              <br />
              <span className="gradient-text">Digital Hero</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
            >
              Transform your brand like never before! Let us help you unlock
              your full potential with innovative digital marketing strategies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(99, 102, 241, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full transition-all duration-300"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="tel:+919560948881"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-200 transition-all duration-300"
              >
                Call Now: +91 9560948881
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-slate-200"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Free Consultation
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                No Hidden Fees
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                24/7 Support
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Guaranteed Results
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
