import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Target, Zap, Heart } from "lucide-react";
import config from "../config";

// Icon mapping for dynamic stats
const iconMap = {
  TrendingUp: TrendingUp,
  Target: Target,
  Zap: Zap,
  Heart: Heart,
};

const defaultStats = [
  {
    icon: "TrendingUp",
    value: 85,
    suffix: "%",
    label: "Website Traffic Growth",
    color: "from-secondary-500 to-teal-500",
  },
  {
    icon: "Target",
    value: 92,
    suffix: "%",
    label: "SEO Optimization Completed",
    color: "from-primary-500 to-indigo-500",
  },
  {
    icon: "Zap",
    value: 70,
    suffix: "%",
    label: "Conversion Rate Boost",
    color: "from-accent-500 to-amber-500",
  },
  {
    icon: "Heart",
    value: 78,
    suffix: "%",
    label: "Social Media Engagement",
    color: "from-rose-500 to-pink-500",
  },
];

const AnimatedCounter = ({ value, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span className="stats-counter">
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [stats, setStats] = useState(defaultStats);
  const [sectionData, setSectionData] = useState({
    badge: "Our Impact",
    heading: {
      line1: "Digital Marketing Agency for",
      line2: "Success Journey"
    },
    description: "Based in Noida (Delhi NCR), we are the top digital marketing firm prepared to grow your company both domestically and internationally. Having worked in the same field for more than three years, we started from scratch and created more than fifty brands."
  });

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/stats/public`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            // Update section data
            if (data.badge) setSectionData(prev => ({ ...prev, badge: data.badge }));
            if (data.heading) setSectionData(prev => ({ ...prev, heading: data.heading }));
            if (data.description) setSectionData(prev => ({ ...prev, description: data.description }));
            
            // Update stats if provided
            if (data.stats && data.stats.length > 0) {
              const mappedStats = data.stats.map((stat, index) => ({
                ...stat,
                icon: stat.icon || defaultStats[index % defaultStats.length]?.icon || 'TrendingUp',
                color: stat.color || defaultStats[index % defaultStats.length]?.color || 'from-green-500 to-emerald-500',
              }));
              setStats(mappedStats);
            }
          }
        }
      } catch (error) {
        console.log('Using default stats data');
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Animated gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-slate-200 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">
              {sectionData.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-slate-800">{sectionData.heading?.line1 || "Digital Marketing Agency for"}</span>
            <br />
            <span className="gradient-text">{sectionData.heading?.line2 || "Success Journey"}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            {sectionData.description}
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || TrendingUp;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="relative group"
            >
              <div className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-primary-300 transition-all duration-500 overflow-hidden">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color || 'from-green-500 to-emerald-500'} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color || 'from-green-500 to-emerald-500'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span
                    className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color || 'from-green-500 to-emerald-500'} bg-clip-text text-transparent`}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      isInView={isInView}
                    />
                  </span>
                </div>

                {/* Label */}
                <p className="text-slate-600 font-medium">{stat.label}</p>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${stat.value}%` } : {}}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`h-full bg-gradient-to-r ${stat.color || 'from-green-500 to-emerald-500'} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};

export default Stats;
