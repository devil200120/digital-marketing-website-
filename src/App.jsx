import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Stats from "./components/Stats";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CursorGlow from "./components/CursorGlow";
import FloatingContact from "./components/FloatingContact";

// Admin imports
import Login from "./admin/auth/Login";
import ProtectedRoute from "./admin/auth/ProtectedRoute";
import Layout from "./admin/components/Layout";
import Dashboard from "./admin/pages/Dashboard";
import AdminHero from "./admin/pages/Hero";
import AdminAbout from "./admin/pages/About";
import AdminServices from "./admin/pages/Services";
import AdminStats from "./admin/pages/Stats";
import AdminTestimonials from "./admin/pages/Testimonials";
import AdminBlog from "./admin/pages/Blog";
import AdminContacts from "./admin/pages/Contacts";

// Main Website Component
function MainWebsite() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Ensure scroll position is at top after loading
      window.scrollTo(0, 0);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen">
      <CursorGlow />
      <FloatingContact />
      <div className="noise-overlay" />
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <Services />
        <About />
        <Stats />
        <WhyUs />
        <Testimonials />
        <Blog />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// Admin Layout Wrapper
function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<MainWebsite />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/hero"
          element={
            <AdminLayout>
              <AdminHero />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/about"
          element={
            <AdminLayout>
              <AdminAbout />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/services"
          element={
            <AdminLayout>
              <AdminServices />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/stats"
          element={
            <AdminLayout>
              <AdminStats />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <AdminLayout>
              <AdminTestimonials />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <AdminLayout>
              <AdminBlog />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <AdminLayout>
              <AdminContacts />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
