import { useState, useEffect } from 'react';
import api from '../api/axios';

// Generic fetch hook
export function useApiData(endpoint, defaultValue = null) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

// Hero data hook
export function useHero() {
  return useApiData('/hero/public', {
    badge: '#1 Digital Marketing Agency in Noida',
    heading: { line1: 'Unlock Your', line2: "Brand's Potential" },
    subHeading: 'Innovative digital marketing strategies that transform businesses.',
    buttonPrimary: { text: 'Get Free Consultation', link: '#contact' },
    buttonSecondary: { text: 'Explore Services', link: '#services' },
    heroImage: '/images/header-home4.webp',
    features: [
      { icon: 'TrendingUp', text: 'Growth Focused' },
      { icon: 'Users', text: '50+ Brands' },
      { icon: 'Globe', text: 'Global Reach' }
    ],
    stats: {
      trafficGrowth: { value: '85%', label: 'Traffic Growth' },
      happyClients: { value: '50+', label: 'Happy Clients' }
    }
  });
}

// About data hook
export function useAbout() {
  return useApiData('/about/public', {
    heading: { line1: 'Your Worldwide Partner', line2: 'in Digital Success' },
    description: '',
    image1: '/images/about-image-1.webp',
    image2: '/images/about-image2-1.webp',
    highlights: [],
    features: [],
    experienceYears: '3+'
  });
}

// Services data hook
export function useServices() {
  return useApiData('/services/public', []);
}

// Stats data hook
export function useStats() {
  return useApiData('/stats/public', { stats: [], settings: {} });
}

// Testimonials data hook  
export function useTestimonials() {
  return useApiData('/testimonials/public', { testimonials: [], settings: {} });
}

// Blog data hook
export function useBlog() {
  return useApiData('/blog/public', { blogs: [], settings: {} });
}

// Contact info hook
export function useContactInfo() {
  return useApiData('/contact/info', {
    phone: '+91 9560948881',
    email: 'info@nishkarsh.solutions',
    whatsapp: '+919560948881',
    address: '',
    socialLinks: {}
  });
}

// Settings hook
export function useSettings() {
  return useApiData('/settings/public', {
    siteName: 'Nihkarsh Technology',
    tagline: 'Private Limited',
    logo: '/images/Nihkarsh-Technology-1536x768.webp'
  });
}
