import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiSave,
  FiX,
  FiStar,
  FiMessageCircle,
} from "react-icons/fi";
import ImageUpload from "../components/ImageUpload";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    image: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
      image: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.content) return;

    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, form);
      } else {
        await api.post("/testimonials", form);
      }
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setForm({
      name: testimonial.name,
      role: testimonial.role || "",
      company: testimonial.company || "",
      content: testimonial.content,
      rating: testimonial.rating || 5,
      image: testimonial.image || "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Testimonials</h2>
          <p className="text-slate-400 mt-1">
            Manage customer testimonials and reviews
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
          <FiMessageCircle size={18} />
          <span className="text-sm font-medium">
            {testimonials.length} Reviews
          </span>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          {editingId ? "Edit Testimonial" : "Add New Testimonial"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Role / Position
              </label>
              <input
                type="text"
                placeholder="CEO"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company
              </label>
              <input
                type="text"
                placeholder="Acme Inc."
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Testimonial Content *
            </label>
            <textarea
              rows="4"
              placeholder="What the customer said about your services..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Rating
              </label>
              <div className="flex gap-2 bg-slate-800/30 rounded-xl p-3 border border-slate-700 w-fit">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className={`p-1 transition-all hover:scale-110 ${
                      star <= form.rating ? "text-amber-400" : "text-slate-600"
                    }`}
                  >
                    <FiStar
                      size={28}
                      fill={star <= form.rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Profile Image
              </label>
              <ImageUpload
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                placeholder="Upload or enter profile image URL"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/25"
            >
              {editingId ? <FiSave /> : <FiPlus />}
              {editingId ? "Update Testimonial" : "Add Testimonial"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-xl font-medium transition-all border border-slate-700"
              >
                <FiX />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-full bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 text-center text-slate-500">
            No testimonials added yet. Add your first one above!
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6 flex flex-col hover:border-emerald-500/30 transition-all group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-emerald-500/50 transition-all"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={16}
                    className={
                      star <= testimonial.rating
                        ? "text-amber-400"
                        : "text-slate-700"
                    }
                    fill={star <= testimonial.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-300 text-sm flex-grow italic leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                >
                  <FiEdit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
