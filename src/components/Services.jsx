import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  Share2,
  MousePointer,
  Palette,
  LineChart,
  Code,
  ArrowUpRight,
  X,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import config from "../config";

// Icon mapping for dynamic services
const iconMap = {
  Search: Search,
  Share2: Share2,
  MousePointer: MousePointer,
  Palette: Palette,
  LineChart: LineChart,
  Code: Code,
};

// Default services data
const defaultServices = [
  {
    number: "01",
    icon: "Search",
    title: "SEO Optimization",
    description:
      "Boost your search rankings with our comprehensive SEO strategies. We use ethical, white-hat techniques to improve your online visibility.",
    fullDescription:
      "We at our digital marketing organization are adamant that SEO is the foundation of every company's website. We promise you a thorough SEO strategy that is executed using ethical SEO tactics. Our comprehensive approach includes keyword research, on-page optimization, technical SEO, link building, and content strategy to ensure your website ranks higher and attracts quality organic traffic.",
    image: "/images/Finding-The-Right-Seo-Agency-In-Noida-1536x864.webp",
    color: "from-blue-500 to-cyan-500",
    features: [
      "Comprehensive Keyword Research",
      "On-Page & Off-Page SEO",
      "Technical SEO Audit",
      "Link Building Strategy",
      "Content Optimization",
      "Local SEO Services",
      "Monthly Performance Reports",
      "Competitor Analysis",
    ],
  },
  {
    number: "02",
    icon: "Share2",
    title: "Social Media Marketing",
    description:
      "Build your brand presence across all social platforms. Engage your audience and drive meaningful interactions that convert.",
    fullDescription:
      "Use our social media marketing and other digital marketing solutions to set your brand apart and grow your company. Having a social media presence is crucial for drawing in new customers, regardless of whether you're operating a B2B, B2C, or D2C company. We create engaging content, manage your social profiles, and run targeted campaigns to boost your brand visibility and engagement.",
    image: "/images/social-media-marketing-agency-1536x864.webp",
    color: "from-pink-500 to-rose-500",
    features: [
      "Social Media Strategy",
      "Content Creation & Curation",
      "Community Management",
      "Influencer Marketing",
      "Paid Social Campaigns",
      "Analytics & Reporting",
      "Brand Monitoring",
      "Engagement Optimization",
    ],
  },
  {
    number: "03",
    icon: "MousePointer",
    title: "Google Ads (PPC)",
    description:
      "Maximize ROI with targeted PPC campaigns. As a certified Google Partner, we deliver results-driven advertising strategies.",
    fullDescription:
      "Our PPC management services and targeted techniques are intended to help you expand your business, and we are a certified Google Partner. As one of the top providers of performance marketing services, we are ranked among the best digital marketing agencies. We create, manage, and optimize your paid advertising campaigns to deliver maximum ROI.",
    image: "/images/Digital-marketing-1-1536x864.webp",
    color: "from-primary-500 to-orange-500",
    features: [
      "Google Ads Management",
      "Search & Display Campaigns",
      "Remarketing Strategies",
      "Shopping Campaigns",
      "YouTube Advertising",
      "Conversion Tracking",
      "A/B Testing",
      "Budget Optimization",
    ],
  },
  {
    number: "04",
    icon: "Palette",
    title: "Graphic Designing",
    description:
      "Create stunning visuals that capture attention. Our design team brings your brand vision to life with creative excellence.",
    fullDescription:
      "Our creative design team brings your brand vision to life with stunning visuals that capture attention and communicate your message effectively. From logos to marketing materials, we create designs that resonate with your target audience and strengthen your brand identity across all platforms.",
    image: "/images/Graphic-Designing-1536x864.webp",
    color: "from-purple-500 to-violet-500",
    features: [
      "Logo & Brand Identity",
      "Marketing Collaterals",
      "Social Media Graphics",
      "Infographics Design",
      "Packaging Design",
      "Print Design",
      "UI/UX Design",
      "Motion Graphics",
    ],
  },
  {
    number: "05",
    icon: "LineChart",
    title: "Performance Marketing",
    description:
      "Data-driven marketing strategies that deliver measurable results. Track, analyze, and optimize for maximum performance.",
    fullDescription:
      "Our performance marketing approach focuses on measurable results and ROI. We leverage data analytics, advanced targeting, and continuous optimization to ensure every marketing dollar works harder for your business. From lead generation to customer acquisition, we drive results that matter.",
    image: "/images/Best-Digital-Marketing-Agency-in-Noida-1536x864.webp",
    color: "from-green-500 to-emerald-500",
    features: [
      "Lead Generation Campaigns",
      "Conversion Rate Optimization",
      "Multi-Channel Marketing",
      "Marketing Automation",
      "ROI Tracking & Analysis",
      "Customer Journey Mapping",
      "Attribution Modeling",
      "Growth Hacking Strategies",
    ],
  },
  {
    number: "06",
    icon: "Code",
    title: "Web Development",
    description:
      "Custom websites that convert visitors into customers. Responsive, fast, and optimized for search engines.",
    fullDescription:
      "We build custom websites that not only look stunning but also perform exceptionally. Our development team creates responsive, fast-loading, and SEO-optimized websites that provide excellent user experience and drive conversions. From simple landing pages to complex web applications, we deliver solutions that grow with your business.",
    image: "/images/Best-Digital-Marketing-Agency-in-Noida.webp",
    color: "from-indigo-500 to-blue-500",
    features: [
      "Custom Website Development",
      "E-commerce Solutions",
      "WordPress Development",
      "Landing Page Design",
      "Website Maintenance",
      "Speed Optimization",
      "Mobile Responsiveness",
      "CMS Integration",
    ],
  },
];

const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!service) return null;
  
  // Get icon component from iconMap or default to Search
  const IconComponent = iconMap[service.icon] || Search;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-800 rounded-3xl border border-dark-600/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-700/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-600 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Image */}
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/50 to-transparent" />

              {/* Service number & icon */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color || 'from-primary-500 to-orange-500'} flex items-center justify-center shadow-lg`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span
                    className={`text-sm font-medium bg-gradient-to-r ${service.color || 'from-primary-500 to-orange-500'} bg-clip-text text-transparent`}
                  >
                    Service {service.number}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {service.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {service.fullDescription}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span
                    className={`w-8 h-1 rounded-full bg-gradient-to-r ${service.color}`}
                  />
                  What We Offer
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 border border-dark-600/50"
                    >
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 text-transparent bg-gradient-to-r ${service.color} bg-clip-text`}
                        style={{
                          color: service.color.includes("blue")
                            ? "#3b82f6"
                            : service.color.includes("pink")
                            ? "#ec4899"
                            : service.color.includes("primary")
                            ? "#ed7410"
                            : service.color.includes("purple")
                            ? "#8b5cf6"
                            : service.color.includes("green")
                            ? "#22c55e"
                            : "#6366f1",
                        }}
                      />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#contact"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl shadow-lg transition-all duration-300`}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-dark-700 text-white font-semibold rounded-xl border border-dark-600 hover:border-primary-500/50 transition-all duration-300"
                >
                  Request Quote
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServiceCard = ({ service, index, onClick }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  // Get icon component from iconMap or default to Search
  const IconComponent = iconMap[service.icon] || Search;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="service-card-3d h-full">
        <div className="relative h-full bg-dark-800/50 rounded-3xl overflow-hidden border border-dark-600/50 hover:border-primary-500/30 transition-all duration-500">
          {/* Service number */}
          <div className="absolute top-6 right-6 z-20">
            <span
              className={`text-6xl font-bold bg-gradient-to-r ${service.color || 'from-primary-500 to-orange-500'} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity`}
            >
              {service.number}
            </span>
          </div>

          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/50 to-transparent" />

            {/* Icon */}
            <div
              className={`absolute bottom-4 left-6 w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color || 'from-primary-500 to-orange-500'} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
            >
              <IconComponent className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-4">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Learn more link */}
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 group/link">
              View Details
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>

          {/* Hover gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState(defaultServices);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/services`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Map API data to include default colors and numbers
            const mappedServices = data.map((service, index) => ({
              ...service,
              number: String(index + 1).padStart(2, '0'),
              color: service.color || defaultServices[index % defaultServices.length]?.color || 'from-primary-500 to-orange-500',
              icon: service.icon || defaultServices[index % defaultServices.length]?.icon || 'Search',
              features: service.features || defaultServices[index % defaultServices.length]?.features || [],
              fullDescription: service.fullDescription || service.description,
            }));
            setServices(mappedServices);
          }
        }
      } catch (error) {
        console.log('Using default services data');
      }
    };
    fetchServices();
  }, []);

  const handleCardClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Background */}
      <div className="absolute inset-0 dots-pattern opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={sectionRef} className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">
              Our Services
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            <span className="text-white">Our Expertise,</span>
            <br />
            <span className="gradient-text">Your Success</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Comprehensive digital marketing solutions tailored to elevate your
            brand and drive measurable results.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onClick={() => handleCardClick(service)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
          >
            Explore All Services
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
