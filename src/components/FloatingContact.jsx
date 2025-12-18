import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle } from "lucide-react";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const contactOptions = [
    {
      id: "phone",
      icon: Phone,
      label: "Call Us",
      href: "tel:+919090083783",
      gradient: "from-green-400 to-green-600",
      shadow: "shadow-green-500/50",
      hoverShadow: "hover:shadow-green-500/70",
      delay: 0.1,
    },
    {
      id: "whatsapp",
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: "WhatsApp",
      href: "https://wa.me/919090083783",
      gradient: "from-green-500 to-emerald-600",
      shadow: "shadow-emerald-500/50",
      hoverShadow: "hover:shadow-emerald-500/70",
      delay: 0.2,
    },
  ];

  // Floating animation for main button
  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Pulse ring animation
  const pulseRingVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.5, 2],
      opacity: [0.5, 0.3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  // Menu item variants with stagger
  const menuItemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.3,
    },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: delay,
      },
    }),
    exit: (delay) => ({
      opacity: 0,
      y: 50,
      scale: 0.3,
      transition: {
        duration: 0.2,
        delay: delay * 0.5,
      },
    }),
  };

  // Label variants
  const labelVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.8,
      transition: { duration: 0.15 },
    },
  };

  // Main button variants
  const mainButtonVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 180,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Contact Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-end gap-3 mb-4"
          >
            {contactOptions.map((option) => (
              <motion.div
                key={option.id}
                className="flex items-center gap-3"
                custom={option.delay}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onHoverStart={() => setHoveredItem(option.id)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                {/* Label */}
                <AnimatePresence>
                  {hoveredItem === option.id && (
                    <motion.span
                      variants={labelVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="px-4 py-2 bg-white text-gray-800 text-sm font-semibold rounded-lg shadow-lg whitespace-nowrap"
                    >
                      {option.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Button */}
                <motion.a
                  href={option.href}
                  target={option.id === "whatsapp" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${option.gradient} text-white flex items-center justify-center shadow-lg ${option.shadow} ${option.hoverShadow} transition-shadow duration-300`}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: "0 0 30px rgba(34, 197, 94, 0.6)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${option.gradient} blur-lg opacity-0`}
                    whileHover={{ opacity: 0.5 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {typeof option.icon === "function" ? (
                      <option.icon />
                    ) : (
                      <option.icon className="w-6 h-6" />
                    )}
                  </motion.div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.div className="relative">
        {/* Pulse rings - only show when closed */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              variants={pulseRingVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              variants={pulseRingVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "0.5s" }}
              transition={{ delay: 0.5 }}
            />
          </>
        )}

        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-br from-purple-500 to-purple-700 shadow-purple-500/50"
              : "bg-gradient-to-br from-purple-500 to-pink-500 shadow-pink-500/50"
          }`}
          variants={mainButtonVariants}
          animate={isOpen ? "open" : "closed"}
          whileHover={{
            scale: 1.1,
            boxShadow: isOpen
              ? "0 0 40px rgba(168, 85, 247, 0.7)"
              : "0 0 40px rgba(236, 72, 153, 0.7)",
          }}
          whileTap={{ scale: 0.9 }}
          {...(!isOpen && { animate: { ...floatingAnimation, rotate: 0 } })}
        >
          {/* Spinning background gradient */}
          <motion.div
            className="absolute inset-1 rounded-full bg-gradient-to-r from-white/20 to-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Icon with animation */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <X className="w-6 h-6 relative z-10" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ rotate: 180, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -180, opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <MessageCircle className="w-6 h-6 relative z-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip when closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [10, 0, 0, 10],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
            >
              Contact Us
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FloatingContact;
