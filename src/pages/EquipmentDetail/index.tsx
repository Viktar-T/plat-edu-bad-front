import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LineChart,
  GaugeChart,
  MultiAxisChart
} from '../../components/charts';
import type { 
  EquipmentDetail as EquipmentDetailType, 
  HistoricalData 
} from '../../types';
import { equipmentService } from '../../services';
import { Loading } from '../../components/common';
import { StatusIndicator } from '../../components/charts';
import { EquipmentChart } from '../../components/charts';
import { 
  EquipmentControls, 
  EquipmentSpecs, 
  EquipmentPhoto 
} from '../../components/equipment';
import { mockData } from '../../data/mockData';

/**
 * Equipment Detail Page Component
 * 
 * Displays comprehensive information about a specific piece of equipment
 * including real-time data, controls, specifications, and historical charts.
 */
const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [equipment, setEquipment] = useState<EquipmentDetailType | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for real-time displays
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch equipment details
  useEffect(() => {
    const fetchEquipment = async () => {
      if (!id) {
        setError('Equipment ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const equipmentData = await equipmentService.getEquipmentDetail(id);
        setEquipment(equipmentData);
        
        // Fetch historical data
        const historyData = await equipmentService.getHistoricalData(id, 24);
        setHistoricalData(historyData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load equipment details');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  // Get equipment-specific data based on equipment type
  const getEquipmentData = () => {
    if (!id) return mockData.timeSeries.solarPanel;
    
    if (id.startsWith('1.1')) {
      return mockData.timeSeries.solarPanel;
    } else if (id.startsWith('2.1')) {
      return mockData.timeSeries.windTurbine;
    } else if (id.includes('battery') || id.includes('storage')) {
      return mockData.timeSeries.battery;
    } else if (id.includes('inverter')) {
      return mockData.timeSeries.inverter;
    }
    
    return mockData.timeSeries.solarPanel;
  };

  // Handle control changes
  const handleControlChange = async (controlId: string, value: any): Promise<boolean> => {
    if (!equipment) return false;

    try {
      const success = await equipmentService.sendControlCommand(equipment.id, controlId, value);
      
      if (success) {
        // Update equipment data with new control values
        setEquipment(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            controls: prev.controls?.map(control => 
              control.id === controlId ? { ...control, value } : control
            )
          };
        });
      }
      
      return success;
    } catch (err) {
      console.error('Control change failed:', err);
      return false;
    }
  };

  // Handle navigation to related equipment
  const handleRelatedEquipmentClick = (relatedId: string) => {
    navigate(`/equipment/${relatedId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  // Error state
  if (error || !equipment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-red-800 mb-2">
            Equipment Not Found
          </h1>
          <p className="text-red-600 mb-4">
            {error || 'The requested equipment could not be found.'}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/floor-plan')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Floor Plan
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const equipmentData = getEquipmentData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation Header */}
      <div className="mb-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <button
            onClick={() => navigate('/')}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('/floor-plan')}
            className="hover:text-blue-600 transition-colors"
          >
            Floor Plan
          </button>
          <span>/</span>
          <span className="text-gray-800 font-medium">{equipment.name}</span>
        </nav>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {equipment.name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{equipment.type}</p>
            <p className="text-gray-500">{equipment.location}</p>
            <p className="text-sm text-gray-400 mt-1">
              Last updated: {currentTime.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <StatusIndicator 
              status={equipment.status} 
              lastUpdate={equipment.data.timestamp}
            />
            <button
              onClick={() => navigate('/floor-plan')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Floor Plan
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Gauges Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Real-Time Equipment Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GaugeChart
            title="Power Output"
            subtitle="Current power generation"
            data={equipmentData}
            value={Number(equipment.data.power) || 0}
            min={0}
            max={1000}
            unit="W"
            warningThreshold={800}
            criticalThreshold={950}
            height={250}
            size={150}
            showExport={true}
            exportOptions={{
              exportAsPng: true,
              exportAsSvg: true
            }}
            ariaLabel={`${equipment.name} power output gauge`}
          />
          
          <GaugeChart
            title="Voltage"
            subtitle="Current voltage reading"
            data={equipmentData}
            value={Number(equipment.data.voltage) || 0}
            min={200}
            max={250}
            unit="V"
            warningThreshold={240}
            criticalThreshold={245}
            height={250}
            size={150}
            showExport={true}
            exportOptions={{
              exportAsPng: true,
              exportAsSvg: true
            }}
            ariaLabel={`${equipment.name} voltage gauge`}
          />
          
          <GaugeChart
            title="Temperature"
            subtitle="Operating temperature"
            data={equipmentData}
            value={Number(equipment.data.temperature) || 0}
            min={0}
            max={80}
            unit="°C"
            warningThreshold={60}
            criticalThreshold={70}
            height={250}
            size={150}
            showExport={true}
            exportOptions={{
              exportAsPng: true,
              exportAsSvg: true
            }}
            ariaLabel={`${equipment.name} temperature gauge`}
          />
          
          <GaugeChart
            title="Efficiency"
            subtitle="System efficiency"
            data={equipmentData}
            value={Number(equipment.data.efficiency) || 0}
            min={0}
            max={100}
            unit="%"
            warningThreshold={70}
            criticalThreshold={60}
            height={250}
            size={150}
            showExport={true}
            exportOptions={{
              exportAsPng: true,
              exportAsSvg: true
            }}
            ariaLabel={`${equipment.name} efficiency gauge`}
          />
        </div>
      </section>

      {/* Equipment Photo and Description */}
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EquipmentPhoto
            photoPath={equipment.photoPath}
            alt={equipment.name}
            className="h-96"
          />
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{equipment.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Manufacturer</div>
                <div className="font-medium text-gray-800">{equipment.manufacturer}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Model</div>
                <div className="font-medium text-gray-800">{equipment.model}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Serial Number</div>
                <div className="font-medium text-gray-800">{equipment.serialNumber}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Installation Date</div>
                <div className="font-medium text-gray-800">
                  {new Date(equipment.installationDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Data Charts */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Historical Performance Data
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart
            title="Power Output Over Time"
            subtitle="Historical power generation trends"
            data={equipmentData}
            dataKeys={['power']}
            xAxisLabel="Time"
            yAxisLabel="Power (W)"
            units={{ power: 'W' }}
            height={300}
            showExport={true}
            exportOptions={{
              exportAsPng: true,
              exportAsSvg: true,
              exportAsCsv: true
            }}
            ariaLabel={`${equipment.name} power output historical chart`}
          />
          
          <MultiAxisChart
            title="Temperature vs Efficiency"
            subtitle="Relationship between temperature and efficiency"
            data={equipmentData}
            primaryDataKeys={['temperature']}
            secondaryDataKeys={['efficiency']}
            xAxisLabel="Time"
            primaryYAxisLabel="Temperature (°C)"
            secondaryYAxisLabel="Efficiency (%)"
            units={{ temperature: '°C', efficiency: '%' }}
            height={300}
            showExport={true}
            exportOptions={{
              exportAsPng: true,
              exportAsSvg: true,
              exportAsCsv: true
            }}
            ariaLabel={`${equipment.name} temperature vs efficiency chart`}
          />
        </div>
      </section>

      {/* Real-Time Data Dashboard */}
      <section className="mb-8">
        <EquipmentChart
          equipmentId={equipment.id}
          data={historicalData}
        />
      </section>

      {/* Equipment Specifications */}
      <section className="mb-8">
        <EquipmentSpecs
          specifications={equipment.specifications}
          technicalSpecs={equipment.technicalSpecs}
        />
      </section>

      {/* Equipment Controls */}
      {equipment.controls && equipment.controls.length > 0 && (
        <section className="mb-8">
          <EquipmentControls
            controls={equipment.controls}
            onControlChange={handleControlChange}
          />
        </section>
      )}

      {/* Related Equipment */}
      {equipment.relatedEquipment && equipment.relatedEquipment.length > 0 && (
        <section className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Equipment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equipment.relatedEquipment.map((relatedId) => (
                <button
                  key={relatedId}
                  onClick={() => handleRelatedEquipmentClick(relatedId)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="font-medium text-gray-800">Equipment {relatedId}</div>
                  <div className="text-sm text-gray-600">Click to view details</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Additional Information */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          About This Equipment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Educational Purpose</h3>
            <p className="text-sm leading-relaxed">
              This equipment is part of our integrated renewable energy laboratory designed 
              for educational and research purposes. It provides hands-on experience with 
              real-world renewable energy systems and monitoring technologies.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Safety & Maintenance</h3>
            <p className="text-sm leading-relaxed">
              All equipment is regularly maintained and monitored for safety. 
              Please follow all safety protocols when operating or observing this equipment. 
              For maintenance requests or technical support, contact the laboratory staff.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EquipmentDetail; 