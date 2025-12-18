import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiPlus, FiTrash2, FiGrid } from "react-icons/fi";
import ImageUpload from "../components/ImageUpload";

export default function Services() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    image: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await api.get("/services");
    setServices(res.data || []);
  };

  const addService = async () => {
    if (!form.title || !form.description) return;
    await api.post("/services", form);
    setForm({ title: "", description: "", icon: "", image: "" });
    fetchServices();
  };

  const deleteService = async (id) => {
    if (!confirm("Delete this service?")) return;
    await api.delete(`/services/${id}`);
    fetchServices();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Services Section</h2>
          <p className="text-slate-400 mt-1">Add and manage your services</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
          <FiGrid size={18} />
          <span className="text-sm font-medium">
            {services.length} Services
          </span>
        </div>
      </div>

      {/* Add Service */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6 space-y-5">
        <h3 className="text-lg font-semibold text-white">Add New Service</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Service Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />

          <input
            type="text"
            placeholder="Icon class (e.g. fa-solid fa-code)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>

        <textarea
          rows="3"
          placeholder="Service Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
        />

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Service Image
          </label>
          <ImageUpload
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
            placeholder="Upload or enter service image URL"
          />
        </div>

        <button
          onClick={addService}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
        >
          <FiPlus />
          Add Service
        </button>
      </div>

      {/* Service List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-5 flex flex-col hover:border-slate-700 transition-all"
          >
            {service.image && (
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-36 w-full object-cover"
                />
              </div>
            )}

            <h4 className="text-lg font-semibold text-white">
              {service.title}
            </h4>

            <p className="text-sm text-slate-400 mt-2 flex-grow line-clamp-3">
              {service.description}
            </p>

            <button
              onClick={() => deleteService(service._id)}
              className="mt-4 inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        ))}

        {services.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-500">
            No services added yet. Add your first service above!
          </div>
        )}
      </div>
    </div>
  );
}
