import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, BarChart2, ArrowRight, PieChart } from 'lucide-react';
import eduBadPlat from '../assets/edu-bad-plat.png';

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

  return (
    <button
      onClick={handleClick}
      className={`group relative w-full md:w-[22rem] bg-white rounded-2xl shadow-xl border border-gray-200 px-10 py-12 flex flex-col items-center justify-center transition-all duration-200 hover:shadow-2xl hover:border-${accentColor}-400 focus:outline-none focus:ring-4 focus:ring-${accentColor}-200 mb-6 md:mb-0`}
      aria-label={title}
      disabled={loading}
      tabIndex={0}
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
    >
      <div className={`mb-6 text-6xl text-${accentColor}-600`} aria-hidden="true">
        {icon}
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors text-center">{title}</h2>
      <p className="text-gray-700 mb-8 text-base text-center max-w-xs">{description}</p>
      <span className={`mt-2 flex items-center justify-center w-14 h-14 rounded-full bg-${accentColor}-100 group-hover:bg-${accentColor}-200 transition-colors`} aria-hidden="true">
        <ArrowRight className={`w-8 h-8 text-${accentColor}-600 group-hover:text-${accentColor}-800 transition-colors`} />
      </span>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl">
          <span className={`animate-spin h-10 w-10 border-4 border-${accentColor}-600 border-t-transparent rounded-full`}></span>
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
      {/* Platform Diagram Image */}
      <div className="w-full flex justify-center mb-8">
        <img
          src={eduBadPlat}
          alt="Educational Platform Diagram"
          className="max-w-xs md:max-w-md lg:max-w-lg w-full h-auto rounded-xl shadow-md border border-gray-200"
        />
      </div>
    </main>
  );
};

export default Home; 