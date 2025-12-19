import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Loader2,
  Clock,
  Globe,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Zap,
  Shield,
  HeadphonesIcon,
} from "lucide-react";
import config from "../config";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: [
      "SF 191, GAUR CITY CENTER",
      "Sector 4, Gautam Buddha Nagar",
      "Uttar Pradesh - 201318",
    ],
    gradient: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/20",
  },
  {
    icon: Phone,
    title: "Call Us Anytime",
    details: ["+91 9560948881", "+91 9090083783"],
    link: "tel:+919560948881",
    gradient: "from-green-500 to-emerald-600",
    shadow: "shadow-green-500/20",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@nishkarsh.solutions"],
    link: "mailto:info@nishkarsh.solutions",
    gradient: "from-primary-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 10:00 AM - 7:00 PM", "Sunday: Closed"],
    gradient: "from-indigo-500 to-violet-600",
    shadow: "shadow-purple-500/20",
  },
];

const features = [
  { icon: Zap, text: "Quick Response" },
  { icon: Shield, text: "100% Secure" },
  { icon: HeadphonesIcon, text: "24/7 Support" },
  { icon: Globe, text: "Global Reach" },
];

const services = [
  "SEO Optimization",
  "Social Media Marketing",
  "Google Ads (PPC)",
  "Graphic Designing",
  "Performance Marketing",
  "Web Development",
  "Brand Strategy",
  "Content Marketing",
];

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-50px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const form = formRef.current;
      if (form) {
        const rect = form.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${config.apiUrl}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          service: formState.service,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset after showing success
        setTimeout(() => {
          setIsSubmitted(false);
          setFormState({
            name: "",
            email: "",
            phone: "",
            service: "",
            message: "",
          });
        }, 4000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary-500/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary-200 mb-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8"
          >
            <span className="text-slate-800">Let's Create</span>
            <br />
            <span className="relative">
              <span className="gradient-text">Something Amazing</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M2 10C50 4 100 4 150 6C200 8 250 4 298 10"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to transform your digital presence? Our team of experts is
            here to help you achieve your goals. Let's start the conversation!
          </motion.p>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm backdrop-blur-sm"
              >
                <feature.icon className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-slate-600">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${info.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />

                  <div className="relative p-6 rounded-2xl bg-white backdrop-blur-sm border border-slate-200 group-hover:border-transparent transition-all duration-500 h-full shadow-sm">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} ${info.shadow} shadow-lg flex items-center justify-center mb-4`}
                    >
                      <info.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {info.title}
                    </h3>

                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        {info.details.map((detail, i) => (
                          <span key={i} className="block text-sm">
                            {detail}
                          </span>
                        ))}
                      </a>
                    ) : (
                      info.details.map((detail, i) => (
                        <p key={i} className="text-slate-500 text-sm">
                          {detail}
                        </p>
                      ))
                    )}

                    {/* Decorative corner */}
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${info.gradient} opacity-5 rounded-bl-[100px] rounded-tr-2xl`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

              <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden border border-dark-600/50 group-hover:border-transparent transition-colors duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.1234567890123!2d77.4567890123456!3d28.567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzA0LjQiTiA3N8KwMjcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />

                {/* Map overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent pointer-events-none" />

                {/* Location pin animation */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative">
                    <MapPin
                      className="w-10 h-10 text-primary-500 drop-shadow-lg"
                      fill="#ed7410"
                    />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/30 rounded-full blur-sm" />
                  </div>
                </motion.div>

                {/* Visit us badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="flex items-center justify-between p-4 rounded-xl glass backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Visit Our Office
                        </p>
                        <p className="text-gray-400 text-xs">
                          Noida, Uttar Pradesh
                        </p>
                      </div>
                    </div>
                    <motion.a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium flex items-center gap-1"
                    >
                      Directions
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Form glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-secondary-500/10 rounded-[2rem] blur-xl opacity-50" />

            <div
              className="relative p-8 md:p-10 rounded-[2rem] bg-white backdrop-blur-xl border border-slate-200 overflow-hidden shadow-xl"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.04), transparent 40%)`,
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-500/5 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary-500/5 to-transparent rounded-tr-full" />

              {/* Form header */}
              <div className="relative mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30"
                  >
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <MessageSquare className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Send us a Message
                    </h3>
                    <p className="text-slate-500 text-sm">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.1,
                      }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-white mb-2"
                    >
                      Message Sent Successfully!
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-400 text-center"
                    >
                      Thank you for reaching out. We'll contact you shortly.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative space-y-6"
                  >
                    {/* Name & Email Row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <motion.label
                          htmlFor="name"
                          animate={{
                            color:
                              focusedField === "name" ? "#6366f1" : "#64748b",
                          }}
                          className="block text-sm font-semibold mb-2 transition-colors"
                        >
                          Full Name *
                        </motion.label>
                        <motion.input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="relative">
                        <motion.label
                          htmlFor="email"
                          animate={{
                            color:
                              focusedField === "email" ? "#6366f1" : "#64748b",
                          }}
                          className="block text-sm font-semibold mb-2 transition-colors"
                        >
                          Email Address *
                        </motion.label>
                        <motion.input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone & Service Row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <motion.label
                          htmlFor="phone"
                          animate={{
                            color:
                              focusedField === "phone" ? "#6366f1" : "#64748b",
                          }}
                          className="block text-sm font-semibold mb-2 transition-colors"
                        >
                          Phone Number
                        </motion.label>
                        <motion.input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="relative">
                        <motion.label
                          htmlFor="service"
                          animate={{
                            color:
                              focusedField === "service"
                                ? "#6366f1"
                                : "#64748b",
                          }}
                          className="block text-sm font-semibold mb-2 transition-colors"
                        >
                          Service Interested In
                        </motion.label>
                        <motion.select
                          id="service"
                          name="service"
                          value={formState.service}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("service")}
                          onBlur={() => setFocusedField(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none appearance-none cursor-pointer"
                        >
                          <option value="">Select a service</option>
                          {services.map((service, i) => (
                            <option
                              key={i}
                              value={service.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {service}
                            </option>
                          ))}
                        </motion.select>
                        {/* Custom dropdown arrow */}
                        <div className="absolute right-4 top-[42px] pointer-events-none">
                          <svg
                            className="w-5 h-5 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <motion.label
                        htmlFor="message"
                        animate={{
                          color:
                            focusedField === "message" ? "#6366f1" : "#64748b",
                        }}
                        className="block text-sm font-semibold mb-2 transition-colors"
                      >
                        Your Message *
                      </motion.label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 outline-none resize-none"
                        placeholder="Tell us about your project, goals, and how we can help..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{
                        scale: isSubmitting ? 1 : 1.02,
                        boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.4)",
                      }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="relative w-full group overflow-hidden"
                    >
                      {/* Button background animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 rounded-xl" />
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-secondary-500 via-primary-500 to-primary-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                      </motion.div>

                      <span className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-lg">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Send Message
                            <ArrowRight className="w-5 h-5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                          </>
                        )}
                      </span>
                    </motion.button>

                    {/* Privacy note */}
                    <p className="text-center text-slate-500 text-sm">
                      By submitting, you agree to our{" "}
                      <a href="#" className="text-primary-500 hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
