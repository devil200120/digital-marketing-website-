import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");
  const canvasRef = useRef(null);

  // Loading texts that change as progress increases
  const loadingMessages = [
    { threshold: 0, text: "Initializing" },
    { threshold: 20, text: "Loading Assets" },
    { threshold: 40, text: "Preparing Experience" },
    { threshold: 60, text: "Almost There" },
    { threshold: 80, text: "Finalizing" },
    { threshold: 95, text: "Welcome" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Update loading text based on progress
  useEffect(() => {
    const message = [...loadingMessages].reverse().find((m) => progress >= m.threshold);
    if (message) setLoadingText(message.text);
  }, [progress]);

  // Particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#ed7410" : "#0ca5eb",
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (120 - distance) / 120 * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const companyName = "NIHKARSH";
  const tagline = "TECHNOLOGY";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-900 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
        />

        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(237,116,16,0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(12,165,235,0.1) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Rotating rings */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <motion.div
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-primary-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border border-secondary-500/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full border border-primary-500/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full"
            style={{
              background: i % 2 === 0 
                ? "linear-gradient(135deg, #ed7410, #f59e0b)" 
                : "linear-gradient(135deg, #0ca5eb, #06b6d4)",
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.8,
            }}
            className="relative mb-8"
          >
            {/* Glow behind logo */}
            <motion.div
              className="absolute inset-0 blur-2xl"
              style={{
                background: "linear-gradient(135deg, #ed7410, #0ca5eb)",
                opacity: 0.3,
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <img
              src="/images/Nihkarsh-Technology-1536x768.webp"
              alt="Nihkarsh Technology"
              className="relative h-20 md:h-28 object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Animated company name */}
          <div className="flex overflow-hidden mb-2">
            {companyName.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-orange-400 bg-clip-text text-transparent"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Technology text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex gap-1 mb-8"
          >
            {tagline.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="text-lg md:text-2xl font-medium text-gray-400 tracking-[0.3em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.03 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Circular progress */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8">
            {/* Background circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="4"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                style={{ filter: "drop-shadow(0 0 10px rgba(237,116,16,0.5))" }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ed7410" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#0ca5eb" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"
                key={progress}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                {progress}%
              </motion.span>
            </div>

            {/* Rotating dot on circle */}
            <motion.div
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg shadow-primary-500/50"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: progress * 3.6,
              }}
              transition={{ duration: 0.1 }}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{
                  transform: `translate(-50%, -50%) translateY(-${32 * 1.4}px)`,
                }}
              />
            </motion.div>
          </div>

          {/* Loading text with typewriter effect */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm md:text-base text-gray-400 font-medium tracking-wider"
            >
              {loadingText}
            </motion.span>
            <motion.span
              className="flex gap-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary-500"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-xs md:text-sm text-gray-500 tracking-widest uppercase"
          >
            Digital Marketing Excellence
          </motion.p>
        </div>

        {/* Bottom wave decoration */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
              fill="url(#waveGradient)"
              animate={{
                d: [
                  "M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z",
                  "M0,80 C360,20 720,100 1080,40 C1260,70 1380,50 1440,80 L1440,120 L0,120 Z",
                  "M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(237,116,16,0.1)" />
                <stop offset="50%" stopColor="rgba(12,165,235,0.1)" />
                <stop offset="100%" stopColor="rgba(237,116,16,0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
