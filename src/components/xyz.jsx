import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Check } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Services', 'Blog', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="cursor-pointer max-h-full" onClick={() => { setCurrentPage('Home'); setIsOpen(false); }}>
            {/* <h1 className={`text-2xl font-bold transition-colors ${scrolled ? 'text-teal-600' : 'text-white'}`}>
              Brandinux
            </h1> */}
            <img src="/images/Brandinux_Logo_Blue_Teal.png" className='w-auto h-auto max-h-20 lg:max-h-20 object-contain scale-110' alt="Brandinux Logo" />
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`transition-colors font-medium ${
                  currentPage === item
                    ? 'text-teal-600'
                    : scrolled
                      ? 'text-gray-700 hover:text-teal-600 fw-bold'
                      : 'text-black hover:text-teal-600 fw-bold'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('Contact')}
              className="hidden md:inline bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
            >
              Book Consultation
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded ${scrolled ? 'text-gray-700' : 'text-slate-800'}`}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => {
                setCurrentPage(item);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const HeroSection = ({ setCurrentPage }) => (
  <section className="h-[90vh] lg:pt-24 bg-gradient-to-r from-teal-600 to-purple-600 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6 ">
        Grow Your Brand Digitally with Brandinux
      </h1>
      <p className="text-md md:text-xl max-w-3xl mx-auto my-8 text-teal-100">
        Brandinux delivers integrated digital solutions combining strategy, creativity, technology, and performance marketing to support long-term brand growth. In today's competitive digital ecosystem, visibility alone does not guarantee success.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => setCurrentPage('Contact')}
          className="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:scale-105 transform transition duration-300"
        >
          Book a Free Consultation
        </button>
        <button
          onClick={() => setCurrentPage('About')}
          className="bg-transparent border border-white px-8 py-3 rounded-lg hover:bg-white/10 transition duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-20 bg-slate-800/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        What Makes Brandinux Different
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: 'Strategy Driven Execution',
            desc: 'Every project begins with understanding your business goals, audience behavior, and market positioning. Strategies are built with purpose, ensuring measurable business outcomes.',
            icon: '🎯'
          },
          {
            title: 'Creative + Performance Focus',
            desc: 'Creativity is balanced with performance. Designs, content, and campaigns are developed not just to look good, but to engage users and improve conversions.',
            icon: '✨'
          },
          {
            title: 'SEO-Ready & Scalable Solutions',
            desc: 'Everything is built with search engine optimization in mind. This ensures better visibility, sustainable organic growth, and scalability as your business expands.',
            icon: '📈'
          },
          {
            title: 'Transparent Process & Reporting',
            desc: 'Brandinux follows a clear workflow with open communication. Clients receive performance insights, progress updates, and realistic expectations at every stage.',
            icon: '📊'
          }
        ].map((f, i) => (
          <div
            key={i}
            className="p-8 rounded-xl shadow hover:shadow-lg transition bg-teal-50 border-slate-100 hover:bg-teal-200 border border-transparent hover:border-teal-200 transform hover:-translate-y-2"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-lg mb-3 text-gray-900">{f.title}</h3>
            <p className="text-gray-700">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesPreview = ({ setCurrentPage }) => (
  <section className="py-20 bg-teal-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        Our Digital Approach
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'Website Design & Development',
            desc: 'Performance-driven websites built with SEO-ready architecture. Mobile-responsive, fast-loading, and designed to support branding, marketing, and lead generation.'
          },
          {
            title: 'Search Engine Optimization',
            desc: 'Continuous SEO as a growth process. Technical foundations, keyword research, and content optimization designed to improve organic visibility and build authority.'
          },
          {
            title: 'Social Media & Content Marketing',
            desc: 'Planned content and social media strategies. Content designed to educate, engage, and guide audiences through the decision-making journey.'
          },
          {
            title: 'Performance Marketing',
            desc: 'Paid advertising campaigns structured around clear objectives. Continuous monitoring and optimization ensure efficient budget usage and measurable ROI.'
          },
          {
            title: 'Branding & Creative Services',
            desc: 'Strong branding that defines how you communicate and connect emotionally with your audience. Logo systems, messaging, and visual guidelines for consistency.'
          },
          {
            title: 'Local Business Marketing',
            desc: 'Optimized local digital assets, local SEO, and trust-building strategies. Help businesses strengthen community presence and drive local growth.'
          }
        ].map((s, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">{s.title}</h3>
            <p className="text-gray-700 mb-4">{s.desc}</p>
            <button
              onClick={() => setCurrentPage('Services')}
              className="text-teal-600 font-medium hover:text-teal-800 transition inline-flex items-center gap-2"
            >
              Learn More <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <section className="pt-32 pb-20 bg-slate-800/50">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-6xl">
      <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">About Brandinux</h2>

      <div className="space-y-6 text-lg text-gray-700 mb-12 max-w-7xl">
        <p>
          Brandinux is a digital marketing and branding company committed to helping businesses grow with clarity, consistency, and strategic focus in the digital ecosystem. Built on a strategy-first foundation, Brandinux combines creative thinking, modern technology, and performance marketing to deliver sustainable digital growth for brands across industries.
        </p>
        <p>
          At Brandinux, the belief is simple: every brand has a unique story, and digital success comes from communicating that story clearly and consistently across platforms. Rather than relying on trends or generic tactics, Brandinux focuses on understanding the brand's purpose, audience, and long-term vision.
        </p>
        <p>
          The Brandinux approach begins with research and discovery. Time is invested in understanding business models, customer behavior, competitive landscapes, and growth opportunities. This insight-driven process ensures that branding, communication, and marketing efforts are aligned with real business objectives.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-teal-50 p-8 rounded-xl border border-teal-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Philosophy</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <Check size={20} className="text-teal-600 flex-shrink-0 mt-1" />
              <span><strong>Strategic Clarity:</strong> Clear understanding of brand positioning and messaging</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-teal-600 flex-shrink-0 mt-1" />
              <span><strong>Transparency:</strong> Open communication and collaborative workflows</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-teal-600 flex-shrink-0 mt-1" />
              <span><strong>Long-term Growth:</strong> Sustainable digital solutions, not short-term fixes</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-teal-600 flex-shrink-0 mt-1" />
              <span><strong>Integrated Approach:</strong> Services work together for consistency and efficiency</span>
            </li>
          </ul>
        </div>

        <div className="bg-teal-50 p-8 rounded-xl border border-teal-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Who We Work With</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <Check size={20} className="text-teal-600 flex-shrink-0 mt-1" />
              <span><strong>Startups:</strong> Building digital foundations from scratch</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-teal-600 flex-shrink-0 mt-1" />
              <span><strong>Small Businesses:</strong> Scalable solutions that grow with you</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-teal-600 flex-shrink-0 mt-1" />
              <span><strong>Growing Enterprises:</strong> Expanding digital presence across markets</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-teal-600 flex-shrink-0 mt-1" />
              <span><strong>Brands Seeking Growth:</strong> Long-term strategic partners</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const ServicesPage = () => (
  <section className="pt-32 pb-20 bg-slate-800/50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-4 text-gray-900 text-center">Our Services</h2>
      <p className="text-lg text-gray-600 mb-12 max-w-7xl text-center">
        Integrated digital solutions designed to work together, ensuring consistency and efficiency across all digital channels.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {[
          {
            title: 'Website Design & Development',
            points: [
              'Clean and professional design',
              'Mobile-responsive layouts',
              'Fast loading speed and performance optimization',
              'SEO friendly structure',
              'User-focused navigation',
              'Seamless user experiences supporting long-term growth'
            ]
          },
          {
            title: 'Search Engine Optimization (SEO)',
            points: [
              'Technical SEO analysis and optimization',
              'Keyword research focused on search intent',
              'On-page SEO and content optimization',
              'Content alignment for better rankings',
              'Continuous monitoring and reporting',
              'Local SEO for geographic targeting'
            ]
          },
          {
            title: 'Social Media Marketing',
            points: [
              'Strategy-driven approach',
              'Content planning and calendars',
              'Visual storytelling and creatives',
              'Audience engagement and community building',
              'Performance tracking and optimization',
              'Paid social media campaigns'
            ]
          },
          {
            title: 'Branding & Creative Services',
            points: [
              'Brand discovery and strategy',
              'Logo systems and visual guidelines',
              'Brand messaging and positioning',
              'Digital creatives for web and campaigns',
              'Consistency across all touchpoints',
              'Brand identity development'
            ]
          },
          {
            title: 'Paid Advertising',
            points: [
              'Campaign strategy and planning',
              'Google Ads management',
              'Social advertising campaigns',
              'Keyword and audience targeting',
              'Ad copy and landing page optimization',
              'Performance monitoring and ROI tracking'
            ]
          },
          {
            title: 'Local Business Marketing',
            points: [
              'Google Business Profile optimization',
              'Local SEO optimization',
              'Location-based keywords',
              'Local trust building',
              'Review and rating management',
              'Geographic visibility improvement'
            ]
          }
        ].map((service, i) => (
          <div key={i} className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition hover:bg-teal-400/50">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
            <ul className="space-y-2">
              {service.points.map((point, j) => (
                <li key={j} className="flex items-start gap-3 text-gray-700">
                  <Check size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className='font-semibold'>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-teal-500 p-12 rounded-2xl text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Grow?</h3>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Every digital journey starts with clarity. Brandinux works closely with businesses to build strategies aligned with creativity and data-driven decisions.
        </p>
      </div>
    </div>
  </section>
);

const BlogPage = () => (
  <section className="pt-32 pb-20 bg-slate-500/50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-4 text-gray-900 text-center">Insights, Strategies & Digital Growth Knowledge</h2>
      <p className="text-lg text-gray-600 mb-12">
        The Brandinux Blog is a knowledge hub designed to educate, inform, and guide businesses through the evolving digital marketing landscape. We believe that content should create value before selling.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          {
            title: 'Digital Marketing Strategies',
            desc: 'In-depth articles covering SEO, social media marketing, content marketing, paid advertising, and performance optimization.'
          },
          {
            title: 'Branding & Growth Insights',
            desc: 'Learn how strong branding, consistent messaging, and creative strategy contribute to long-term digital success.'
          },
          {
            title: 'Website & SEO Best Practices',
            desc: 'Guides on website usability, SEO fundamentals, keyword strategies, and technical optimization for better visibility.'
          },
          {
            title: 'Startup & Business Growth Tips',
            desc: 'Practical advice for startups and growing businesses on building digital foundations and scaling effectively.'
          },
          {
            title: 'Industry Trends & Updates',
            desc: 'Stay informed about the latest digital trends, platform updates, and best practices shaping the online ecosystem.'
          },
          {
            title: 'Content with Purpose',
            desc: 'Each blog is created with a clear objective—whether increasing awareness, improving understanding, or supporting better decision-making.'
          }
        ].map((blog, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-gray-900">{blog.title}</h3>
            <p className="text-gray-700">{blog.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-teal-50 border border-teal-200 p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold mb-3 text-gray-900">Learn. Apply. Grow.</h3>
        <p className="text-gray-700 mb-6">
          The Brandinux Blog is more than just articles, it's a resource for businesses looking to grow digitally with clarity and confidence.
        </p>
        <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition">
          Explore Latest Blogs
        </button>
      </div>
    </div>
  </section>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  const benefits = [
    'Strategy First Consultation',
    'Clear & Honest Communication',
    'Tailored Digital Solutions',
    'Long Term Growth Focus'
  ];

  return (
    <div className="pt-[40px] lg:pt-32 pb-20 bg-slate-800/50">
      <div className="bg-gradient-to-r from-slate-800 to-teal-600 py-20 text-white mb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build Your Digital Growth Together
          </h1>
          <p className="text-lg md:text-xl">
            Start with a meaningful conversation about your goals and digital strategy
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Why Reach Out to Brandinux
            </h2>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full flex-shrink-0">
                    <Check size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{benefit}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-teal-600/50 py-8 px-4 rounded-2xl border border-teal-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">What Happens Next</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">1.</span>
                  <span className='  '>Initial discussion to understand your business and goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">2.</span>
                  <span>Analysis of current digital presence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">3.</span>
                  <span>Identification of growth opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">4.</span>
                  <span>Recommendation of suitable digital services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">5.</span>
                  <span>Clear roadmap for execution and next steps</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Book Your Free Consultation
            </h3>
            {sent && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
                ✓ Thanks! Your request has been received. We'll contact you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition"
                  placeholder="Tell us about your project and goals"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition transform hover:scale-105"
              >
                Book Free Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setCurrentPage }) => {
  // Social Media Links with SVG Icons
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
      url: 'https://facebook.com/brandinux' 
    },
    // { 
    //   name: 'Twitter', 
    //   icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.556 10 10 0 01-2.963.827 4.958 4.958 0 002.178-2.725c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
    //   url: 'https://twitter.com/brandinux' 
    // },
    { 
      name: 'LinkedIn', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.836 0-9.754h3.554v1.391c.43-.665 1.199-1.61 2.920-1.61 2.135 0 3.733 1.395 3.733 4.403v5.57zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.951.765-1.704 1.959-1.704 1.188 0 1.914.75 1.939 1.704 0 .946-.751 1.704-1.983 1.704zm1.581 11.597H3.715V9.542h3.203v10.91zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>,
      url: 'https://linkedin.com/company/brandinux' 
    },
    { 
      name: 'Instagram', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>,
      url: 'https://instagram.com/brandinux' 
    },
    { 
      name: 'YouTube', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
      url: 'https://youtube.com/@brandinux' 
    }
  ];

  

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Section with Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Brandinux</h3>
            <p className="text-gray-400 text-sm mb-6">
              Your long-term digital partner for strategic growth and brand success.
            </p>
            
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setCurrentPage(item)}
                    className="text-gray-400 hover:text-white transition text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Website Development</li>
              <li>SEO Services</li>
              <li>Social Media Marketing</li>
              <li>Branding & Creative</li>
              <li>Paid Advertising</li>
            </ul>
          </div>

          {/* Get Started CTA */}
          <div className="text-center md:text-left">
            <h4 className="font-bold mb-4 text-white">Get Started</h4>
            <button
              onClick={() => setCurrentPage('Contact')}
              className="bg-teal-600 text-white px-6 py-3 mb-3 rounded-full font-semibold hover:bg-indigo-700 transition w-full md:w-auto"
            >
              Book Consultation
            </button>
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left ">
              &copy; 2026 Brandinux. All rights reserved. Built with strategy, creativity &amp; performance.
            </p>
            
            
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main>
        {currentPage === 'Home' && (
          <>
            <HeroSection setCurrentPage={setCurrentPage} />
            <FeaturesSection />
            <ServicesPreview setCurrentPage={setCurrentPage} />
          </>
        )}
        {currentPage === 'About' && <AboutPage />}
        {currentPage === 'Services' && <ServicesPage />}
        {currentPage === 'Blog' && <BlogPage />}
        {currentPage === 'Contact' && <ContactPage />}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
