import React from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Equipment', to: '/equipment' },
  { label: 'Floor Plan', to: '/floor-plan' },
];

/**
 * Main layout for the educational platform, including header, sidebar, breadcrumbs, content, and footer.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Visually Distinct Header */}
      <header className="w-full bg-gradient-to-r from-blue-700 to-green-600 shadow-md py-6 px-4 flex flex-col items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight text-center drop-shadow-sm max-w-3xl">
            Renewable Energy Monitoring Platform
          </span>
          <nav className="hidden md:flex gap-8 ml-8">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-white/90 hover:text-white font-medium text-lg transition-colors focus:outline-none focus:underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Responsive Sidebar (mobile) */}
      <aside className="md:hidden bg-white shadow px-4 py-2 flex gap-4 overflow-x-auto border-b">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="text-gray-700 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:underline">
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Main Content Layout */}
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-56 flex-shrink-0 bg-white rounded-lg shadow p-4 h-fit self-start mt-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-gray-700 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-white rounded-2xl shadow p-8 min-h-[60vh] flex flex-col items-center justify-center">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-xs md:text-sm">
          &copy; {new Date().getFullYear()} Renewable Energy Educational Platform &mdash; Developed for Academic Use at Your Institution Name
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 