import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import config from "../config";

const defaultTestimonials = [
  {
    name: "Rajeev Sharma",
    role: "CEO, Digital Tech Solutions",
    image: "/images/topimg-home1.webp",
    rating: 5,
    text: "The digital marketing company in Noida transformed our online presence! Their strategies boosted our traffic and engagement significantly. Highly recommend their expert services!",
  },
  {
    name: "Simran Kaur",
    role: "Marketing Director, Elite Brands",
    image: "/images/image2-home4.webp",
    rating: 5,
    text: "Working with this digital marketing company in Noida was a game-changer. Their team delivered measurable results, enhancing our brand visibility and conversions. Excellent service!",
  },
  {
    name: "Amit Verma",
    role: "Founder, Fashion Hub",
    image: "/images/image3-home4.webp",
    rating: 5,
    text: "We saw incredible growth after partnering with this digital marketing company in Noida. Their tailored strategies really made a difference in our business performance!",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/testimonials/public`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.testimonials && data.testimonials.length > 0) {
            // Map API data to match expected format
            const mappedTestimonials = data.testimonials.map(t => ({
              name: t.name,
              role: t.role ? `${t.role}${t.company ? `, ${t.company}` : ''}` : t.company || '',
              image: t.image || '/images/topimg-home1.webp',
              rating: t.rating || 5,
              text: t.text,
            }));
            setTestimonials(mappedTestimonials);
          }
        }
      } catch (error) {
        console.log('Using default testimonials data');
      }
    };
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
        <div className="absolute inset-0 dots-pattern opacity-20" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[150px]" />

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
              Real Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-slate-800">What They Say About</span>
            <br />
            <span className="gradient-text">Our Company?</span>
          </motion.h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
                  {/* Quote icon */}
                  <div className="absolute top-8 right-8 opacity-10">
                    <Quote className="w-24 h-24 text-primary-500" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-yellow-500"
                        />
                      )
                    )}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 relative z-10">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500/50">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary-500 w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* All testimonials grid (visible on larger screens) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:grid grid-cols-3 gap-6 mt-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className={`p-6 rounded-2xl bg-white border shadow-lg cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? "border-primary-500/50 scale-105 shadow-xl"
                  : "border-slate-200 hover:border-primary-300 hover:shadow-xl"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
