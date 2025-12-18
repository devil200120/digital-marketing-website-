import { useState } from "react";
import Sidebar, { MobileMenuButton } from "./Sidebar";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Fixed Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area - with margin for sidebar */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        {/* Fixed Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <MobileMenuButton onClick={() => setIsMobileOpen(true)} />

            {/* Search */}
            <div className="relative hidden sm:block">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Mobile Search Button */}
            <button className="sm:hidden p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
              <FiSearch size={18} />
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
              <FiBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-3 lg:pl-4 border-l border-slate-700">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <FiUser className="text-white" size={16} />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
