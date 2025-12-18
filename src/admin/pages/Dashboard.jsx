import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  FiUsers,
  FiGrid,
  FiMessageSquare,
  FiMail,
  FiFileText,
  FiEye,
  FiClock,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    testimonials: 0,
    blogs: 0,
    newContacts: 0,
    totalContacts: 0,
    blogViews: 0,
  });
  const [activities, setActivities] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes, contactsRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/activity?limit=5"),
        api.get("/dashboard/recent-contacts"),
      ]);
      setStats(statsRes.data);
      setActivities(activityRes.data);
      setRecentContacts(contactsRes.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
          <FiTrendingUp size={18} />
          <span className="text-sm font-medium">All Systems Active</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Services"
          value={stats.services}
          icon={<FiGrid size={22} />}
          gradient="from-blue-500 to-cyan-500"
          bgGlow="bg-blue-500/20"
        />
        <StatCard
          title="Testimonials"
          value={stats.testimonials}
          icon={<FiMessageSquare size={22} />}
          gradient="from-purple-500 to-pink-500"
          bgGlow="bg-purple-500/20"
        />
        <StatCard
          title="Blog Posts"
          value={stats.blogs}
          icon={<FiFileText size={22} />}
          gradient="from-emerald-500 to-teal-500"
          bgGlow="bg-emerald-500/20"
        />
        <StatCard
          title="New Contacts"
          value={stats.newContacts}
          icon={<FiMail size={22} />}
          gradient="from-orange-500 to-amber-500"
          bgGlow="bg-orange-500/20"
          highlight={stats.newContacts > 0}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard
          title="Total Contacts"
          value={stats.totalContacts}
          icon={<FiUsers size={22} />}
          gradient="from-indigo-500 to-violet-500"
          bgGlow="bg-indigo-500/20"
        />
        <StatCard
          title="Blog Views"
          value={stats.blogViews}
          icon={<FiEye size={22} />}
          gradient="from-rose-500 to-pink-500"
          bgGlow="bg-rose-500/20"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Quick Overview
          </h3>

          <p className="text-slate-400 leading-relaxed">
            Manage all content of your website from this dashboard. Changes made
            here reflect instantly on the live site.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              "Hero Section",
              "About Content",
              "Services",
              "Testimonials",
              "Statistics",
              "Blog Posts",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiClock className="text-emerald-400" size={18} />
            Recent Activity
          </h3>

          {activities.length > 0 ? (
            <ul className="space-y-4">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 line-clamp-2">
                      {activity.description}
                    </p>
                    <span className="text-xs text-slate-500">
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No recent activity</p>
          )}
        </div>
      </div>

      {/* Recent Contacts */}
      {recentContacts.length > 0 && (
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <FiMail className="text-emerald-400" size={18} />
            Recent Contact Submissions
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-800">
                  <th className="pb-4 font-medium text-sm">Name</th>
                  <th className="pb-4 font-medium text-sm">Email</th>
                  <th className="pb-4 font-medium text-sm">Service</th>
                  <th className="pb-4 font-medium text-sm">Status</th>
                  <th className="pb-4 font-medium text-sm">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-4 text-sm text-white font-medium">
                      {contact.name}
                    </td>
                    <td className="py-4 text-sm text-slate-400">
                      {contact.email}
                    </td>
                    <td className="py-4 text-sm text-slate-400">
                      {contact.service || "-"}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          contact.status === "new"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : contact.status === "read"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-slate-700 text-slate-400 border border-slate-600"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-slate-500">
                      {formatTimeAgo(contact.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* Stat Card Component */
function StatCard({ title, value, icon, gradient, bgGlow, highlight = false }) {
  return (
    <div
      className={`relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6 overflow-hidden ${
        highlight ? "ring-2 ring-orange-500/50" : ""
      }`}
    >
      {/* Background Glow */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 ${bgGlow} rounded-full blur-3xl opacity-50`}
      ></div>

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <h2 className="text-3xl font-bold text-white">{value}</h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-emerald-400">
        <FiArrowUpRight size={14} />
        <span className="text-xs font-medium">Active</span>
      </div>
    </div>
  );
}
