import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, User } from "lucide-react";
import config from "../config";

const defaultBlogPosts = [
  {
    id: 1,
    title: "Finding The Right SEO Agency In Noida: A Complete Guide",
    excerpt:
      "Discover the key factors to consider when choosing an SEO agency in Noida. Learn how to evaluate expertise, track record, and strategies for your business growth.",
    image: "/images/Finding-The-Right-Seo-Agency-In-Noida-1536x864.webp",
    category: "SEO",
    author: "Nihkarsh Team",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Social Media Marketing Strategies That Drive Results",
    excerpt:
      "Explore proven social media marketing tactics that help brands connect with their audience and achieve measurable business outcomes.",
    image: "/images/social-media-marketing-agency-1536x864.webp",
    category: "Social Media",
    author: "Nihkarsh Team",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 3,
    title: "Digital Marketing Trends to Watch in 2025",
    excerpt:
      "Stay ahead of the curve with the latest digital marketing trends. From AI-powered campaigns to voice search optimization.",
    image: "/images/Digital-marketing-1-1536x864.webp",
    category: "Digital Marketing",
    author: "Nihkarsh Team",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    color: "from-primary-500 to-orange-500",
  },
  {
    id: 4,
    title: "Step-by-Step Guide to Pvt Ltd Company Registration",
    excerpt:
      "A comprehensive guide to registering your private limited company in India. Understand the process, documents, and requirements.",
    image: "/images/Step-by-Step-Pvt-Ltd-Registration-Process-1.webp",
    category: "Business",
    author: "Nihkarsh Team",
    date: "Nov 28, 2024",
    readTime: "8 min read",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "The Power of Graphic Design in Brand Building",
    excerpt:
      "Learn how professional graphic design can transform your brand identity and create lasting impressions on your target audience.",
    image: "/images/Graphic-Designing-1536x864.webp",
    category: "Design",
    author: "Nihkarsh Team",
    date: "Nov 20, 2024",
    readTime: "4 min read",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: 6,
    title: "Why Your Business Needs a Digital Marketing Agency",
    excerpt:
      "Discover the benefits of partnering with a digital marketing agency and how it can accelerate your business growth in the digital age.",
    image: "/images/Best-Digital-Marketing-Agency-in-Noida-1536x864.webp",
    category: "Marketing",
    author: "Nihkarsh Team",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    color: "from-indigo-500 to-blue-500",
  },
];

// Color mapping for categories
const categoryColors = {
  SEO: "from-blue-500 to-cyan-500",
  "Social Media": "from-pink-500 to-rose-500",
  "Digital Marketing": "from-primary-500 to-orange-500",
  Business: "from-green-500 to-emerald-500",
  Design: "from-purple-500 to-violet-500",
  Marketing: "from-indigo-500 to-blue-500",
};

const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative h-full bg-dark-800/50 rounded-3xl overflow-hidden border border-dark-600/50 hover:border-primary-500/30 transition-all duration-500">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/30 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${post.color}`}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta info */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Author & Read more */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-400">{post.author}</span>
            </div>

            <motion.span
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-400"
              whileHover={{ x: 5 }}
            >
              Read More
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Blog = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/blog`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Map API data to match expected format
            const mappedPosts = data.map((post, index) => ({
              id: post._id || index + 1,
              title: post.title,
              excerpt: post.excerpt || post.content?.substring(0, 150) + '...',
              image: post.image || defaultBlogPosts[index % defaultBlogPosts.length].image,
              category: post.category || 'Marketing',
              author: post.author || 'Nihkarsh Team',
              date: post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Dec 15, 2024',
              readTime: post.readTime || '5 min read',
              color: categoryColors[post.category] || 'from-primary-500 to-orange-500',
            }));
            setBlogPosts(mappedPosts);
          }
        }
      } catch (error) {
        console.log('Using default blog posts data');
      }
    };
    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[150px]" />

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
              Our Blog
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            <span className="text-white">Latest Insights &</span>
            <br />
            <span className="gradient-text">Industry News</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Stay updated with the latest trends, tips, and strategies in digital
            marketing to help grow your business.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
          >
            View All Articles
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
