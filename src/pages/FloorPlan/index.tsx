import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import images using dynamic imports to avoid TypeScript issues
const floorPlanImage = new URL('../../assets/firstFloor-2D-1.8.PNG', import.meta.url).href;
const marker1Icon = new URL('../../assets/1.1.1-icon-PV-Hulajnogi.png', import.meta.url).href;
const marker2Icon = new URL('../../assets/1.1.2-icon-PV-Hulajnogi-converter.png', import.meta.url).href;
const marker3Icon = new URL('../../assets/2.1.1-icon-Wind-Big-Vertical.png', import.meta.url).href;
const marker4Icon = new URL('../../assets/2.1.3-icon-Wind-Big-Vertical-inverter-storage.png', import.meta.url).href;

// Equipment marker data structure
interface EquipmentMarker {
  id: string;
  name: string;
  description: string;
  icon: string;
  position: {
    bottom: string;
    left?: string;
    right?: string;
  };
  size: string;
}

// Connection line data structure
interface ConnectionLine {
  id: string;
  fromMarkerId: string;
  toMarkerId: string;
  color: string;
  strokeWidth: number;
  description?: string;
}

// Equipment markers configuration
const equipmentMarkers: EquipmentMarker[] = [
  {
    id: '1.1.1',
    name: 'PV Hulajnogi System',
    description: 'Solar panel system for electric scooter charging station',
    icon: marker1Icon,
    position: {
      bottom: '5%',
      left: 'calc(50% - 10%)'
    },
    size: '10%'
  },
  {
    id: '1.1.2',
    name: 'PV Hulajnogi Converter',
    description: 'Power converter system for solar panel integration',
    icon: marker2Icon,
    position: {
      bottom: '20%',
      left: 'calc(50% + 10%)'
    },
    size: '10%'
  },
  {
    id: '2.1.1',
    name: 'Wind Big Vertical Turbine',
    description: 'Large vertical axis wind turbine for energy generation',
    icon: marker3Icon,
    position: {
      bottom: '25%',
      right: '10%'
    },
    size: '10%'
  },
  {
    id: '2.1.3',
    name: 'Wind Turbine with Inverter & Storage',
    description: 'Complete wind energy system with power conversion and storage',
    icon: marker4Icon,
    position: {
      bottom: '60%',
      right: '25%'
    },
    size: '10%'
  }
];

// Connection lines configuration
const connectionLines: ConnectionLine[] = [
  {
    id: 'connection-1',
    fromMarkerId: '1.1.1',
    toMarkerId: '1.1.2',
    color: '#3B82F6', // Blue
    strokeWidth: 3,
    description: 'Power flow from solar panels to converter'
  }
];

/**
 * SVG Connection Lines Component
 */
interface SVGConnectionsProps {
  connections: ConnectionLine[];
  markers: EquipmentMarker[];
}

const SVGConnections: React.FC<SVGConnectionsProps> = ({ connections, markers }) => {
  // Calculate marker center positions for connection lines
  const getMarkerCenter = (marker: EquipmentMarker) => {
    const size = parseFloat(marker.size);
    const bottom = parseFloat(marker.position.bottom);
    
    let left: number;
    if (marker.position.left) {
      if (marker.position.left.includes('calc')) {
        // Handle calc(50% - 10%) or calc(50% + 10%)
        const match = marker.position.left.match(/calc\(50%\s*([+-])\s*(\d+)%\)/);
        if (match) {
          const operator = match[1];
          const offset = parseFloat(match[2]);
          left = operator === '+' ? 50 + offset : 50 - offset;
        } else {
          left = 50; // fallback
        }
      } else {
        left = parseFloat(marker.position.left);
      }
    } else if (marker.position.right) {
      left = 100 - parseFloat(marker.position.right);
    } else {
      left = 50; // fallback
    }
    
    return {
      x: left + size / 2,
      y: 100 - bottom - size / 2
    };
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
      aria-hidden="true"
      role="img"
      aria-label="Equipment connection lines overlay"
    >
      <defs>
        {/* Arrow marker for connection lines */}
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#3B82F6"
          />
        </marker>
      </defs>
      
      {connections.map((connection) => {
        const fromMarker = markers.find(m => m.id === connection.fromMarkerId);
        const toMarker = markers.find(m => m.id === connection.toMarkerId);
        
        if (!fromMarker || !toMarker) return null;
        
        const fromCenter = getMarkerCenter(fromMarker);
        const toCenter = getMarkerCenter(toMarker);
        
        return (
          <g key={connection.id}>
            {/* Connection line */}
            <line
              x1={`${fromCenter.x}%`}
              y1={`${fromCenter.y}%`}
              x2={`${toCenter.x}%`}
              y2={`${toCenter.y}%`}
              stroke={connection.color}
              strokeWidth={connection.strokeWidth}
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
              opacity="0.8"
            />
            
            {/* Connection label */}
            <text
              x={`${(fromCenter.x + toCenter.x) / 2}%`}
              y={`${(fromCenter.y + toCenter.y) / 2 - 2}%`}
              textAnchor="middle"
              fontSize="12"
              fill={connection.color}
              fontWeight="500"
              opacity="0.9"
            >
              {connection.description}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Equipment Marker Component
 */
interface EquipmentMarkerProps {
  marker: EquipmentMarker;
  onNavigate: (id: string) => void;
}

const EquipmentMarker: React.FC<EquipmentMarkerProps> = ({ marker, onNavigate }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleClick = () => {
    onNavigate(marker.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onNavigate(marker.id);
    }
  };

  return (
    <div
      className="absolute cursor-pointer group"
      style={{
        bottom: marker.position.bottom,
        left: marker.position.left,
        right: marker.position.right,
        width: marker.size,
        height: marker.size,
        zIndex: 20
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="button"
      aria-label={`${marker.name} - ${marker.description}. Click to view details.`}
    >
      {/* Marker Icon */}
      <div className="relative w-full h-full">
        <img
          src={marker.icon}
          alt={`${marker.name} equipment marker`}
          className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 group-focus:scale-110 group-hover:shadow-lg group-focus:shadow-lg group-hover:border-2 group-focus:border-2 group-hover:border-blue-500 group-focus:border-blue-500 rounded-lg"
        />
        
        {/* Hover/Focus Indicator */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-30">
          <div className="font-semibold">{marker.name}</div>
          <div className="text-gray-300 text-xs mt-1 max-w-xs">{marker.description}</div>
          
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

/**
 * Floor Plan Page Component
 * 
 * Displays the first floor layout of the renewable energy laboratory
 * with responsive design, accessibility features, interactive equipment markers,
 * and SVG connection lines.
 */
const FloorPlan: React.FC = () => {
  const navigate = useNavigate();

  const handleMarkerClick = (equipmentId: string) => {
    navigate(`/equipment/${equipmentId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Page Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Laboratory Floor Plan
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore the first floor layout of our renewable energy laboratory. 
          This interactive floor plan shows the arrangement of solar panels, 
          wind turbines, energy storage systems, and monitoring equipment. 
          Click on different areas to learn more about each component.
        </p>
      </header>

      {/* Floor Plan Container */}
      <section className="relative w-full">
        {/* Floor Plan Background */}
        <div className="relative w-full bg-gray-100 rounded-xl shadow-lg overflow-hidden">
          {/* Base Layer: Floor Plan Image */}
          <img
            src={floorPlanImage}
            alt="First floor layout of the renewable energy laboratory showing the arrangement of solar panels, wind turbines, energy storage systems, and monitoring equipment"
            className="w-full h-auto object-contain max-h-[80vh] mx-auto block relative"
            style={{
              aspectRatio: 'auto',
              minHeight: '400px',
              zIndex: 1
            }}
          />
          
          {/* Middle Layer: SVG Connection Lines */}
          <SVGConnections 
            connections={connectionLines}
            markers={equipmentMarkers}
          />
          
          {/* Top Layer: Interactive Equipment Markers */}
          <div className="absolute inset-0 pointer-events-none">
            {equipmentMarkers.map((marker) => (
              <div key={marker.id} className="pointer-events-auto">
                <EquipmentMarker 
                  marker={marker} 
                  onNavigate={handleMarkerClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Legend/Information Panel */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Floor Plan Legend
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Solar Panel Systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Wind Turbine Systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Energy Storage Units</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Monitoring Stations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Control Systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span>Safety Equipment</span>
            </div>
          </div>
          
          {/* Connection Lines Legend */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Connection Lines
            </h3>
            <div className="flex items-center space-x-2">
              <svg width="40" height="4" className="flex-shrink-0">
                <line
                  x1="0"
                  y1="2"
                  x2="40"
                  y2="2"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  markerEnd="url(#legend-arrowhead)"
                />
                <defs>
                  <marker
                    id="legend-arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="#3B82F6"
                    />
                  </marker>
                </defs>
              </svg>
              <span className="text-sm text-gray-600">Power flow connections between equipment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Markers Information */}
      <section className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Interactive Equipment Markers
        </h2>
        <p className="text-gray-600 mb-4">
          Click on the equipment markers on the floor plan above to view detailed information about each system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipmentMarkers.map((marker) => (
            <div 
              key={marker.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => handleMarkerClick(marker.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleMarkerClick(marker.id)}
              tabIndex={0}
              role="button"
              aria-label={`Navigate to ${marker.name} details`}
            >
              <img 
                src={marker.icon} 
                alt={marker.name}
                className="w-8 h-8 object-contain"
              />
              <div>
                <div className="font-medium text-gray-800">{marker.name}</div>
                <div className="text-sm text-gray-600">{marker.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          About This Floor Plan
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This floor plan represents the physical layout of our integrated renewable energy 
          laboratory. The facility is designed to demonstrate real-world applications of 
          solar photovoltaic systems, wind energy conversion, and energy storage technologies. 
          Each area is equipped with state-of-the-art monitoring and control systems for 
          educational and research purposes. The connection lines show the power flow and 
          data communication between different equipment systems.
        </p>
      </section>
    </div>
  );
};

export default FloorPlan; 