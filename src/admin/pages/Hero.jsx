import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiSave, FiCheck, FiLayout } from "react-icons/fi";
import ImageUpload from "../components/ImageUpload";

export default function Hero() {
  const [data, setData] = useState({
    badge: "",
    heading: {
      line1: "",
      line2: "",
    },
    subHeading: "",
    buttonPrimary: {
      text: "",
      link: "",
    },
    buttonSecondary: {
      text: "",
      link: "",
    },
    heroImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get("/hero").then((res) => {
      if (res.data) {
        setData({
          badge: res.data.badge || "",
          heading: {
            line1: res.data.heading?.line1 || "",
            line2: res.data.heading?.line2 || "",
          },
          subHeading: res.data.subHeading || "",
          buttonPrimary: {
            text: res.data.buttonPrimary?.text || "",
            link: res.data.buttonPrimary?.link || "",
          },
          buttonSecondary: {
            text: res.data.buttonSecondary?.text || "",
            link: res.data.buttonSecondary?.link || "",
          },
          heroImage: res.data.heroImage || "",
        });
      }
    });
  }, []);

  const saveHero = async () => {
    setLoading(true);
    await api.put("/hero", data);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Hero Section</h2>
          <p className="text-slate-400 mt-1">
            Manage your homepage hero content
          </p>
        </div>
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/25">
          <FiLayout className="text-white" size={24} />
        </div>
      </div>

      {/* Badge Section */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Badge</h3>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Badge Text
          </label>
          <input
            type="text"
            value={data.badge}
            onChange={(e) => setData({ ...data, badge: e.target.value })}
            placeholder="#1 Digital Marketing Agency"
            className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Heading Section */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Main Heading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Heading Line 1
            </label>
            <input
              type="text"
              value={data.heading.line1}
              onChange={(e) =>
                setData({
                  ...data,
                  heading: { ...data.heading, line1: e.target.value },
                })
              }
              placeholder="Unlock Your"
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Heading Line 2
            </label>
            <input
              type="text"
              value={data.heading.line2}
              onChange={(e) =>
                setData({
                  ...data,
                  heading: { ...data.heading, line2: e.target.value },
                })
              }
              placeholder="Brand's Potential"
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sub Heading */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Sub Heading</h3>
        <textarea
          rows="3"
          value={data.subHeading}
          onChange={(e) => setData({ ...data, subHeading: e.target.value })}
          placeholder="Supporting text that describes your services..."
          className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
        />
      </div>

      {/* Buttons Section */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Action Buttons
        </h3>
        <div className="space-y-6">
          {/* Primary Button */}
          <div>
            <label className="block text-sm font-semibold text-emerald-400 mb-3">
              Primary Button
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={data.buttonPrimary.text}
                  onChange={(e) =>
                    setData({
                      ...data,
                      buttonPrimary: {
                        ...data.buttonPrimary,
                        text: e.target.value,
                      },
                    })
                  }
                  placeholder="Get Free Consultation"
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={data.buttonPrimary.link}
                  onChange={(e) =>
                    setData({
                      ...data,
                      buttonPrimary: {
                        ...data.buttonPrimary,
                        link: e.target.value,
                      },
                    })
                  }
                  placeholder="#contact"
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Secondary Button */}
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-3">
              Secondary Button
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={data.buttonSecondary.text}
                  onChange={(e) =>
                    setData({
                      ...data,
                      buttonSecondary: {
                        ...data.buttonSecondary,
                        text: e.target.value,
                      },
                    })
                  }
                  placeholder="Explore Services"
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={data.buttonSecondary.link}
                  onChange={(e) =>
                    setData({
                      ...data,
                      buttonSecondary: {
                        ...data.buttonSecondary,
                        link: e.target.value,
                      },
                    })
                  }
                  placeholder="#services"
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Hero Image</h3>
        <ImageUpload
          value={data.heroImage}
          onChange={(url) => setData({ ...data, heroImage: url })}
          label=""
          placeholder="Enter hero image URL or upload"
          previewHeight="h-48"
        />
      </div>

      {/* Live Preview */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">
          Live Preview
        </h3>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
          {data.badge && (
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full mb-4">
              {data.badge}
            </span>
          )}
          <h4 className="text-3xl font-bold text-white mb-2">
            {data.heading.line1 || "Unlock Your"} <br />
            <span className="text-emerald-400">
              {data.heading.line2 || "Brand's Potential"}
            </span>
          </h4>
          <p className="text-slate-400 mb-6 max-w-lg">
            {data.subHeading || "Your sub heading will appear here..."}
          </p>
          <div className="flex gap-3">
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-lg">
              {data.buttonPrimary.text || "Primary Button"}
            </span>
            <span className="px-4 py-2 border border-slate-600 text-slate-300 text-sm font-medium rounded-lg">
              {data.buttonSecondary.text || "Secondary Button"}
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={saveHero}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
        >
          <FiSave size={18} />
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {success && (
          <span className="flex items-center gap-2 text-emerald-400 text-sm">
            <FiCheck size={18} />
            Hero section updated
          </span>
        )}
      </div>
    </div>
  );
}
