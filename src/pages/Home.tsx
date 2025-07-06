import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, BarChart2, ArrowRight, PieChart } from 'lucide-react';

/**
 * Navigation card props for the Home page.
 */
interface NavCardProps {
  title: string;
  description: string;
  to: string;
  icon: React.ReactNode;
  accentColor: string;
}

const NavCard: React.FC<NavCardProps> = ({ title, description, to, icon, accentColor }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(to);
    }, 250);
  };

  // Create static class maps for proper Tailwind CSS purging
  const accentColorClasses = {
    blue: {
      border: 'hover:border-blue-400',
      ring: 'focus:ring-blue-200',
      text: 'text-blue-600',
      textHover: 'group-hover:text-blue-800',
      bg: 'bg-blue-100',
      bgHover: 'group-hover:bg-blue-200',
      spinnerBorder: 'border-blue-600'
    },
    green: {
      border: 'hover:border-green-400',
      ring: 'focus:ring-green-200',
      text: 'text-green-600',
      textHover: 'group-hover:text-green-800',
      bg: 'bg-green-100',
      bgHover: 'group-hover:bg-green-200',
      spinnerBorder: 'border-green-600'
    },
    purple: {
      border: 'hover:border-purple-400',
      ring: 'focus:ring-purple-200',
      text: 'text-purple-600',
      textHover: 'group-hover:text-purple-800',
      bg: 'bg-purple-100',
      bgHover: 'group-hover:bg-purple-200',
      spinnerBorder: 'border-purple-600'
    }
  };

  const colors = accentColorClasses[accentColor as keyof typeof accentColorClasses] || accentColorClasses.blue;

  return (
    <button
      onClick={handleClick}
      className={`group relative w-full md:w-[22rem] bg-white rounded-2xl shadow-xl border border-gray-200 px-10 py-12 flex flex-col items-center justify-center transition-all duration-200 hover:shadow-2xl ${colors.border} focus:outline-none focus:ring-4 ${colors.ring} mb-6 md:mb-0`}
      aria-label={title}
      disabled={loading}
      tabIndex={0}
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
    >
      <div className={`mb-6 text-6xl ${colors.text}`} aria-hidden="true">
        {icon}
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors text-center">{title}</h2>
      <p className="text-gray-700 mb-8 text-base text-center max-w-xs">{description}</p>
      <span className={`mt-2 flex items-center justify-center w-14 h-14 rounded-full ${colors.bg} ${colors.bgHover} transition-colors`} aria-hidden="true">
        <ArrowRight className={`w-8 h-8 ${colors.text} ${colors.textHover} transition-colors`} />
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl">
          <span className={`animate-spin h-10 w-10 border-4 ${colors.spinnerBorder} border-t-transparent rounded-full`}></span>
        </div>
      )}
    </button>
  );
};

const Home: React.FC = () => {
  return (
    <main className="w-full flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-blue-50 via-white to-green-50" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      {/* Distinct Header */}
      <header className="w-full bg-gradient-to-r from-blue-700 to-green-600 shadow-lg py-10 px-4 flex flex-col items-center justify-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center drop-shadow-md leading-tight max-w-4xl">
          Real-time Monitoring Educational and Research Platform for Integrated Renewable Energy Sources and Energy Storage Systems
        </h1>
      </header>
      {/* Project Description */}
      <section className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-md p-8 mb-12 text-center border border-blue-100">
        <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium">
          Welcome to the platform! Explore real-time data, interactive laboratory maps, and educational resources about renewable energy systems and energy storage. Designed for academic and research excellence.
        </p>
      </section>
      {/* Navigation Cards */}
      <section className="flex flex-col md:flex-row gap-10 w-full max-w-6xl items-center justify-center mb-16 flex-wrap">
        <NavCard
          title="Laboratory Floor Plan"
          description="View the interactive map of laboratory equipment and explore their locations."
          to="/floor-plan"
          icon={<Map strokeWidth={2.2} />}
          accentColor="blue"
        />
        <NavCard
          title="Data Dashboard"
          description="Access real-time data visualizations and analytics for all laboratory equipment."
          to="/dashboard"
          icon={<BarChart2 strokeWidth={2.2} />}
          accentColor="green"
        />
        <NavCard
          title="Charts Demo"
          description="Explore comprehensive data visualization components including line charts, gauges, and more."
          to="/charts-demo"
          icon={<PieChart strokeWidth={2.2} />}
          accentColor="purple"
        />
      </section>
    </main>
  );
};

export default Home; 