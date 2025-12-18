import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiSave,
  FiX,
  FiEye,
  FiFileText,
} from "react-icons/fi";
import ImageUpload from "../components/ImageUpload";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    author: "",
    image: "",
    isPublished: true,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blog");
      setBlogs(res.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      author: "",
      image: "",
      isPublished: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm({
      ...form,
      title,
      slug: editingId ? form.slug : generateSlug(title),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    const blogData = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(`/blog/${editingId}`, blogData);
      } else {
        await api.post("/blog", blogData);
      }
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content,
      category: blog.category || "",
      tags: blog.tags?.join(", ") || "",
      author: blog.author || "",
      image: blog.image || "",
      isPublished: blog.isPublished !== false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await api.delete(`/blog/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const togglePublish = async (blog) => {
    try {
      await api.put(`/blog/${blog._id}`, {
        ...blog,
        isPublished: !blog.isPublished,
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error toggling publish:", error);
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Blog Posts</h2>
          <p className="text-slate-400 mt-1">Manage your blog content</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
            <FiFileText size={18} />
            <span className="text-sm font-medium">{blogs.length} Posts</span>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/25"
            >
              <FiPlus />
              New Post
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            {editingId ? "Edit Blog Post" : "Create New Post"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="Blog post title"
                  value={form.title}
                  onChange={handleTitleChange}
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="blog-post-url"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Excerpt
              </label>
              <textarea
                rows="2"
                placeholder="Brief summary of the post..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Content *
              </label>
              <textarea
                rows="10"
                placeholder="Full blog post content (supports markdown)..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-sm resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                >
                  <option value="" className="bg-slate-800">
                    Select category
                  </option>
                  <option value="Digital Marketing" className="bg-slate-800">
                    Digital Marketing
                  </option>
                  <option value="SEO" className="bg-slate-800">
                    SEO
                  </option>
                  <option value="Social Media" className="bg-slate-800">
                    Social Media
                  </option>
                  <option value="Content Marketing" className="bg-slate-800">
                    Content Marketing
                  </option>
                  <option value="Web Development" className="bg-slate-800">
                    Web Development
                  </option>
                  <option value="Technology" className="bg-slate-800">
                    Technology
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="seo, marketing, tips"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Featured Image
              </label>
              <ImageUpload
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                placeholder="Upload or enter featured image URL"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
              <input
                type="checkbox"
                id="isPublished"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({ ...form, isPublished: e.target.checked })
                }
                className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="isPublished" className="text-sm text-slate-300">
                Publish immediately
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/25"
              >
                {editingId ? <FiSave /> : <FiPlus />}
                {editingId ? "Update Post" : "Create Post"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-xl font-medium transition-all border border-slate-700"
              >
                <FiX />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Posts Table */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {blogs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-slate-500"
                >
                  <FiFileText size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No blog posts yet. Create your first one!</p>
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-700"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-slate-700">
                          <FiFileText className="text-emerald-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">
                          {blog.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {blog.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {blog.category ? (
                      <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                        {blog.category}
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {blog.author || <span className="text-slate-600">-</span>}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <FiEye size={14} className="text-slate-500" />
                      {blog.views || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(blog)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                        blog.isPublished
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-700 text-slate-400 border border-slate-600"
                      }`}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-emerald-400 hover:text-emerald-300 mr-3 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
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
    </div>
  );
}
