import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from "react-icons/fi";

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    value: "",
    label: "",
    suffix: "%",
    icon: "TrendingUp",
    order: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/stats");
      setStats(res.data || []);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ value: "", label: "", suffix: "%", icon: "TrendingUp", order: 0 });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.value || !form.label) return;

    try {
      if (editingId) {
        await api.put(`/stats/${editingId}`, form);
      } else {
        await api.post("/stats", form);
      }
      resetForm();
      fetchStats();
    } catch (error) {
      console.error("Error saving stat:", error);
    }
  };

  const handleEdit = (stat) => {
    setEditingId(stat._id);
    setForm({
      value: stat.value,
      label: stat.label,
      suffix: stat.suffix || "%",
      icon: stat.icon || "TrendingUp",
      order: stat.order || 0,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this statistic?")) return;
    try {
      await api.delete(`/stats/${id}`);
      fetchStats();
    } catch (error) {
      console.error("Error deleting stat:", error);
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
      <div>
        <h2 className="text-3xl font-bold text-white">Statistics Section</h2>
        <p className="text-slate-400 mt-1">
          Manage the statistics displayed on your website
        </p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {editingId ? "Edit Statistic" : "Add New Statistic"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Value
              </label>
              <input
                type="text"
                placeholder="e.g., 500"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Label
              </label>
              <input
                type="text"
                placeholder="e.g., Projects Completed"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Icon
              </label>
              <select
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              >
                <option value="TrendingUp">Trending Up</option>
                <option value="Users">Users</option>
                <option value="Award">Award</option>
                <option value="Target">Target</option>
                <option value="Zap">Zap</option>
                <option value="Star">Star</option>
                <option value="Heart">Heart</option>
                <option value="CheckCircle">Check Circle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Suffix
              </label>
              <select
                value={form.suffix}
                onChange={(e) => setForm({ ...form, suffix: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              >
                <option value="+">+</option>
                <option value="%">%</option>
                <option value="K">K</option>
                <option value="M">M</option>
                <option value="">None</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Order
              </label>
              <input
                type="number"
                placeholder="0"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium px-5 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
            >
              {editingId ? <FiSave /> : <FiPlus />}
              {editingId ? "Update Statistic" : "Add Statistic"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-3 rounded-xl transition-all"
              >
                <FiX />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Stats List */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Label
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Suffix
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {stats.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No statistics added yet. Add your first one above!
                </td>
              </tr>
            ) : (
              stats.map((stat) => (
                <tr
                  key={stat._id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    {stat.value}
                    {stat.suffix}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{stat.label}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {stat.suffix || "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {stat.order || 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(stat)}
                      className="text-emerald-400 hover:text-emerald-300 mr-4 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(stat._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Preview */}
      {stats.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-500/30 p-8">
          <h3 className="text-white text-lg font-semibold mb-6 text-center">
            Preview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats
              .sort((a, b) => a.order - b.order)
              .map((stat) => (
                <div key={stat._id} className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-emerald-300 text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
