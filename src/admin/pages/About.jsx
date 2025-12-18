import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiSave, FiInfo, FiCheck, FiPlus, FiTrash2 } from "react-icons/fi";
import ImageUpload from "../components/ImageUpload";

export default function About() {
  const [data, setData] = useState({
    badge: "",
    heading: {
      line1: "",
      line2: "",
    },
    description: "",
    image1: "",
    image2: "",
    highlights: [],
    features: [],
    experienceYears: "",
    buttonText: "",
    buttonLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newHighlight, setNewHighlight] = useState({ icon: "", text: "" });

  useEffect(() => {
    api.get("/about").then((res) => {
      if (res.data) {
        setData({
          badge: res.data.badge || "",
          heading: {
            line1: res.data.heading?.line1 || "",
            line2: res.data.heading?.line2 || "",
          },
          description: res.data.description || "",
          image1: res.data.image1 || "",
          image2: res.data.image2 || "",
          highlights: res.data.highlights || [],
          features: res.data.features || [],
          experienceYears: res.data.experienceYears || "",
          buttonText: res.data.buttonText || "",
          buttonLink: res.data.buttonLink || "",
        });
      }
    });
  }, []);

  const saveData = async () => {
    setLoading(true);
    await api.put("/about", data);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setData({ ...data, features: [...data.features, newFeature.trim()] });
    setNewFeature("");
  };

  const removeFeature = (index) => {
    setData({ ...data, features: data.features.filter((_, i) => i !== index) });
  };

  const addHighlight = () => {
    if (!newHighlight.icon || !newHighlight.text) return;
    setData({ ...data, highlights: [...data.highlights, newHighlight] });
    setNewHighlight({ icon: "", text: "" });
  };

  const removeHighlight = (index) => {
    setData({
      ...data,
      highlights: data.highlights.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">About Section</h2>
          <p className="text-slate-400 mt-1">
            Manage your website About content
          </p>
        </div>
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/25">
          <FiInfo className="text-white" size={24} />
        </div>
      </div>

      {/* Badge Section */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Badge & Experience
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Badge Text
            </label>
            <input
              type="text"
              value={data.badge}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              placeholder="About Us"
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Years of Experience
            </label>
            <input
              type="text"
              value={data.experienceYears}
              onChange={(e) =>
                setData({ ...data, experienceYears: e.target.value })
              }
              placeholder="3+"
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
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
              placeholder="Your Worldwide Partner"
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
              placeholder="in Digital Success"
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
        <textarea
          rows="5"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="Enter about section description..."
          className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Images */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Image 1
            </label>
            <ImageUpload
              value={data.image1}
              onChange={(url) => setData({ ...data, image1: url })}
              placeholder="Upload or enter Image 1 URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Image 2
            </label>
            <ImageUpload
              value={data.image2}
              onChange={(url) => setData({ ...data, image2: url })}
              placeholder="Upload or enter Image 2 URL"
            />
          </div>
        </div>
      </div>

      {/* Button Settings */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Action Button</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={data.buttonText}
              onChange={(e) => setData({ ...data, buttonText: e.target.value })}
              placeholder="Learn More About Us"
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Button Link
            </label>
            <input
              type="text"
              value={data.buttonLink}
              onChange={(e) => setData({ ...data, buttonLink: e.target.value })}
              placeholder="#contact"
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Features List</h3>
        <div className="space-y-4">
          {/* Add Feature */}
          <div className="flex gap-3">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addFeature()}
              placeholder="Add a feature (e.g., 'Expert Team')"
              className="flex-1 rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              onClick={addFeature}
              className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all"
            >
              <FiPlus size={20} />
            </button>
          </div>

          {/* Feature List */}
          <div className="flex flex-wrap gap-2">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-xl"
              >
                <span className="text-slate-300 text-sm">{feature}</span>
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
            {data.features.length === 0 && (
              <p className="text-slate-500 text-sm">No features added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Highlights (with Icons)
        </h3>
        <div className="space-y-4">
          {/* Add Highlight */}
          <div className="flex gap-3">
            <input
              type="text"
              value={newHighlight.icon}
              onChange={(e) =>
                setNewHighlight({ ...newHighlight, icon: e.target.value })
              }
              placeholder="Icon name (e.g., 'TrendingUp')"
              className="w-40 rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <input
              type="text"
              value={newHighlight.text}
              onChange={(e) =>
                setNewHighlight({ ...newHighlight, text: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && addHighlight()}
              placeholder="Highlight text (e.g., '24/7 Support')"
              className="flex-1 rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              onClick={addHighlight}
              className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all"
            >
              <FiPlus size={20} />
            </button>
          </div>

          {/* Highlight List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-800/50 border border-slate-700 px-4 py-3 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 text-xs font-mono bg-slate-900 px-2 py-1 rounded">
                    {highlight.icon}
                  </span>
                  <span className="text-slate-300 text-sm">
                    {highlight.text}
                  </span>
                </div>
                <button
                  onClick={() => removeHighlight(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
            {data.highlights.length === 0 && (
              <p className="text-slate-500 text-sm col-span-full">
                No highlights added yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">
          Live Preview
        </h3>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
          {data.badge && (
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full mb-3">
              {data.badge}
            </span>
          )}
          <h4 className="text-2xl font-bold text-white mb-2">
            {data.heading.line1 || "Your Worldwide Partner"} <br />
            <span className="text-emerald-400">
              {data.heading.line2 || "in Digital Success"}
            </span>
          </h4>
          <p className="text-slate-400 text-sm mb-4 line-clamp-3">
            {data.description || "Description will appear here..."}
          </p>
          {data.experienceYears && (
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-2 rounded-lg text-sm mb-4">
              <span className="font-bold text-lg">{data.experienceYears}</span>
              <span>Years Experience</span>
            </div>
          )}
          {data.buttonText && (
            <div className="mt-4">
              <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-lg">
                {data.buttonText}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={saveData}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
        >
          <FiSave size={18} />
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {success && (
          <span className="text-emerald-400 text-sm font-medium flex items-center gap-2">
            <FiCheck size={18} />
            Changes saved successfully
          </span>
        )}
      </div>
    </div>
  );
}
