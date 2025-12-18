import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  FiTrash2,
  FiEye,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiCheck,
  FiX,
  FiInbox,
} from "react-icons/fi";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contact/submissions");
      // API returns { submissions: [...], pagination: {...} }
      setContacts(res.data?.submissions || res.data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/submissions/${id}/status`, { status });
      fetchContacts();
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this contact submission?")) return;
    try {
      await api.delete(`/contact/submissions/${id}`);
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const viewContact = (contact) => {
    setSelectedContact(contact);
    if (contact.status === "new") {
      updateStatus(contact._id, "read");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredContacts = contacts.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const statusCounts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    read: contacts.filter((c) => c.status === "read").length,
    replied: contacts.filter((c) => c.status === "replied").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Contact Submissions</h2>
          <p className="text-slate-400 mt-1">
            View and manage contact form submissions
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
          <FiInbox size={18} />
          <span className="text-sm font-medium">{contacts.length} Total</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-2">
        {["all", "new", "read", "replied"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              filter === status
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span
              className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                filter === status ? "bg-white/20" : "bg-slate-700"
              }`}
            >
              {statusCounts[status]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
          <div className="divide-y divide-slate-800">
            {filteredContacts.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No contact submissions found.
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => viewContact(contact)}
                  className={`p-4 cursor-pointer transition-all hover:bg-slate-800/50 ${
                    selectedContact?._id === contact._id
                      ? "bg-slate-800/70"
                      : ""
                  } ${
                    contact.status === "new"
                      ? "border-l-4 border-emerald-500"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4
                          className={`font-medium ${
                            contact.status === "new"
                              ? "text-white"
                              : "text-slate-300"
                          }`}
                        >
                          {contact.name}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            contact.status === "new"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : contact.status === "replied"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{contact.email}</p>
                      <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                    <div className="text-xs text-slate-500 whitespace-nowrap ml-4">
                      {formatDate(contact.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Detail */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
          {selectedContact ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedContact.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FiMail className="text-slate-500" />
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {selectedContact.email}
                  </a>
                </div>

                {selectedContact.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <FiPhone className="text-slate-500" />
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                )}

                {selectedContact.service && (
                  <div className="flex items-center gap-3 text-sm">
                    <FiMessageSquare className="text-slate-500" />
                    <span className="text-slate-300">
                      {selectedContact.service}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">
                  Message
                </h4>
                <div className="bg-slate-800/50 rounded-xl p-4 text-sm text-slate-300 whitespace-pre-wrap border border-slate-700">
                  {selectedContact.message}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">
                  Update Status
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(selectedContact._id, "read")}
                    className={`flex-1 px-3 py-2.5 text-sm rounded-xl border transition-all ${
                      selectedContact.status === "read"
                        ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                        : "border-slate-700 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <FiEye className="inline mr-1" />
                    Read
                  </button>
                  <button
                    onClick={() => updateStatus(selectedContact._id, "replied")}
                    className={`flex-1 px-3 py-2.5 text-sm rounded-xl border transition-all ${
                      selectedContact.status === "replied"
                        ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                        : "border-slate-700 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <FiCheck className="inline mr-1" />
                    Replied
                  </button>
                </div>

                <a
                  href={`mailto:${selectedContact.email}?subject=Re: Contact from ${selectedContact.name}`}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25"
                >
                  <FiMail className="inline mr-2" />
                  Reply via Email
                </a>

                <button
                  onClick={() => handleDelete(selectedContact._id)}
                  className="w-full px-4 py-3 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/10 transition-all"
                >
                  <FiTrash2 className="inline mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <FiMail size={48} className="mx-auto mb-3 opacity-50" />
                <p>Select a contact to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
