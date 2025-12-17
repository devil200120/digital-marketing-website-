import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Company", href: "#about" },
  { name: "Our Services", href: "#services" },
  { name: "Why Us", href: "#why-us" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact Us", href: "#contact" },
];

const services = [
  { name: "SEO Optimization", href: "#services" },
  { name: "Social Media Marketing", href: "#services" },
  { name: "Google Ads (PPC)", href: "#services" },
  { name: "Graphic Designing", href: "#services" },
  { name: "Web Development", href: "#services" },
  { name: "Performance Marketing", href: "#services" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Refund Policy", href: "#" },
  { name: "Terms & Conditions", href: "#" },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/nihkarshtechnology",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/nihkarshtechnology",
    label: "Instagram",
  },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark-900 pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.a
              href="#home"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center mb-6"
            >
              <img
                src="/images/Nihkarsh-Technology-1536x768.webp"
                alt="Nihkarsh Technology"
                className="h-16 sm:h-20 object-contain -mr-8 sm:-mr-10"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight leading-tight">
                  NIHKARSH TECHNOLOGY
                </span>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase">
                  Private Limited
                </span>
              </div>
            </motion.a>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm leading-relaxed mb-6"
            >
              Empowering businesses with innovative digital solutions, expert
              strategies, and seamless technology integration. Your success is
              our mission.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-600 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-6"
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 group-hover:bg-primary-500 transition-colors" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-6"
            >
              Our Services
            </motion.h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={service.href}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 group-hover:bg-primary-500 transition-colors" />
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-6"
            >
              Contact Info
            </motion.h3>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  SF 191, GAUR CITY CENTER, Sector 4, Gautam Buddha Nagar, Uttar
                  Pradesh - 201318
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <a
                  href="mailto:info@nishkarsh.solutions"
                  className="flex items-center gap-3 text-gray-400 text-sm hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  info@nishkarsh.solutions
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <a
                  href="tel:+919560948881"
                  className="flex items-center gap-3 text-gray-400 text-sm hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  +91 9560948881
                </a>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm text-center md:text-left"
            >
              © {new Date().getFullYear()} Nihkarsh Technology. All Rights
              Reserved.
            </motion.p>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
            >
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-500 text-sm hover:text-primary-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to top button - positioned to the left of floating contact */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-24 w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
