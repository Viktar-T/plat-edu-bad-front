import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main layout for the educational platform, including header, sidebar, breadcrumbs, content, and footer.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Example navigation items
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Equipment', to: '/equipment' },
    { label: 'Floor Plan', to: '/floorplan' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-blue-800 tracking-tight">Renewable Energy Monitoring Platform</span>
          </div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Responsive Sidebar (mobile) */}
      <aside className="md:hidden bg-white shadow px-4 py-2 flex gap-4 overflow-x-auto border-b">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 py-2 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:underline text-blue-700">Home</Link>
          </li>
          {pathnames.map((value, idx) => {
            const to = `/${pathnames.slice(0, idx + 1).join('/')}`;
            const isLast = idx === pathnames.length - 1;
            return (
              <li key={to} className="flex items-center">
                <span className="mx-2">/</span>
                {isLast ? (
                  <span className="font-semibold text-gray-800">{decodeURIComponent(value)}</span>
                ) : (
                  <Link to={to} className="hover:underline text-blue-700">{decodeURIComponent(value)}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Main Content Layout */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-56 flex-shrink-0 bg-white rounded-lg shadow p-4 h-fit self-start">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow p-6 min-h-[60vh]">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Renewable Energy Educational Platform &mdash; Developed for Academic Use at Your Institution Name
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 