import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  FiHome,
  FiImage,
  FiInfo,
  FiGrid,
  FiMessageSquare,
  FiBarChart2,
  FiLogOut,
  FiFileText,
  FiMail,
  FiExternalLink,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
     ${
       isActive
         ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
         : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
     } ${isCollapsed ? "justify-center" : ""}`;

  const closeMobile = () => setIsMobileOpen && setIsMobileOpen(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-72"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div
          className={`px-4 py-6 border-b border-slate-800 ${
            isCollapsed ? "px-3" : "px-6"
          }`}
        >
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div
              className={`flex items-center gap-3 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
                <FiSettings className="text-white" size={20} />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-white">Nishkarsh</h1>
                  <p className="text-xs text-slate-500">Admin Dashboard</p>
                </div>
              )}
            </div>

            {/* Close button for mobile */}
            <button
              onClick={closeMobile}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Collapse Toggle Button - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all shadow-lg"
        >
          {isCollapsed ? (
            <FiChevronRight size={14} />
          ) : (
            <FiChevronLeft size={14} />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-3 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-3">
              Main Menu
            </p>
          )}

          <NavLink
            to="/admin"
            end
            className={linkClass}
            onClick={closeMobile}
            title="Dashboard"
          >
            <FiHome size={18} />
            {!isCollapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/admin/hero"
            className={linkClass}
            onClick={closeMobile}
            title="Hero Section"
          >
            <FiImage size={18} />
            {!isCollapsed && "Hero Section"}
          </NavLink>

          <NavLink
            to="/admin/about"
            className={linkClass}
            onClick={closeMobile}
            title="About Us"
          >
            <FiInfo size={18} />
            {!isCollapsed && "About Us"}
          </NavLink>

          <NavLink
            to="/admin/services"
            className={linkClass}
            onClick={closeMobile}
            title="Services"
          >
            <FiGrid size={18} />
            {!isCollapsed && "Services"}
          </NavLink>

          {!isCollapsed && (
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-3 mt-6">
              Content
            </p>
          )}
          {isCollapsed && (
            <div className="my-4 border-t border-slate-800"></div>
          )}

          <NavLink
            to="/admin/testimonials"
            className={linkClass}
            onClick={closeMobile}
            title="Testimonials"
          >
            <FiMessageSquare size={18} />
            {!isCollapsed && "Testimonials"}
          </NavLink>

          <NavLink
            to="/admin/stats"
            className={linkClass}
            onClick={closeMobile}
            title="Statistics"
          >
            <FiBarChart2 size={18} />
            {!isCollapsed && "Statistics"}
          </NavLink>

          <NavLink
            to="/admin/blog"
            className={linkClass}
            onClick={closeMobile}
            title="Blog Posts"
          >
            <FiFileText size={18} />
            {!isCollapsed && "Blog Posts"}
          </NavLink>

          <NavLink
            to="/admin/contacts"
            className={linkClass}
            onClick={closeMobile}
            title="Contacts"
          >
            <FiMail size={18} />
            {!isCollapsed && "Contacts"}
          </NavLink>
        </nav>

        {/* Bottom Actions */}
        <div
          className={`px-3 pb-6 space-y-2 border-t border-slate-800 pt-4 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <Link
            to="/"
            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl
                       text-slate-400 hover:bg-slate-800/50 hover:text-emerald-400
                       transition-all duration-300 font-medium ${
                         isCollapsed ? "justify-center px-2" : ""
                       }`}
            title="View Website"
          >
            <FiExternalLink size={18} />
            {!isCollapsed && "View Website"}
          </Link>

          <button
            onClick={logout}
            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl
                       text-slate-400 hover:bg-red-500/10 hover:text-red-400
                       transition-all duration-300 font-medium ${
                         isCollapsed ? "justify-center px-2" : ""
                       }`}
            title="Logout"
          >
            <FiLogOut size={18} />
            {!isCollapsed && "Logout"}
          </button>

          {!isCollapsed && (
            <p className="text-xs text-slate-600 mt-4 px-4 text-center">
              © {new Date().getFullYear()} Nishkarsh Technology
            </p>
          )}
        </div>
      </aside>
    </>
  );
}

// Mobile menu toggle button component
export function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
    >
      <FiMenu size={20} />
    </button>
  );
}
