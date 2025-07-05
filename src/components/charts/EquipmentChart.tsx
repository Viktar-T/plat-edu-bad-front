import React, { useState } from 'react';
import { RealTimeChart } from './index';
import type { HistoricalData, ChartConfig } from '../../types';

interface EquipmentChartProps {
  equipmentId: string;
  data: HistoricalData[];
  className?: string;
}

const EquipmentChart: React.FC<EquipmentChartProps> = ({
  equipmentId,
  data,
  className = ''
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<number>(24);

  // Chart configurations based on equipment type
  const getChartConfigs = (equipmentId: string): ChartConfig[] => {
    if (equipmentId.startsWith('1.1')) {
      // Solar panel systems
      return [
        {
          title: 'Power Output',
          type: 'line',
          dataKey: 'power',
          yAxisLabel: 'Power (W)',
          color: '#3B82F6',
          unit: 'W'
        },
        {
          title: 'Voltage',
          type: 'line',
          dataKey: 'voltage',
          yAxisLabel: 'Voltage (V)',
          color: '#10B981',
          unit: 'V'
        },
        {
          title: 'Current',
          type: 'line',
          dataKey: 'current',
          yAxisLabel: 'Current (A)',
          color: '#F59E0B',
          unit: 'A'
        },
        {
          title: 'Efficiency',
          type: 'area',
          dataKey: 'efficiency',
          yAxisLabel: 'Efficiency (%)',
          color: '#8B5CF6',
          unit: '%'
        }
      ];
    } else if (equipmentId.startsWith('2.1')) {
      // Wind turbine systems
      return [
        {
          title: 'Power Generation',
          type: 'line',
          dataKey: 'power',
          yAxisLabel: 'Power (W)',
          color: '#3B82F6',
          unit: 'W'
        },
        {
          title: 'Voltage Output',
          type: 'line',
          dataKey: 'voltage',
          yAxisLabel: 'Voltage (V)',
          color: '#10B981',
          unit: 'V'
        },
        {
          title: 'Current Output',
          type: 'line',
          dataKey: 'current',
          yAxisLabel: 'Current (A)',
          color: '#F59E0B',
          unit: 'A'
        },
        {
          title: 'System Efficiency',
          type: 'area',
          dataKey: 'efficiency',
          yAxisLabel: 'Efficiency (%)',
          color: '#8B5CF6',
          unit: '%'
        }
      ];
    }
    
    // Default charts for other equipment
    return [
      {
        title: 'Power',
        type: 'line',
        dataKey: 'power',
        yAxisLabel: 'Power (W)',
        color: '#3B82F6',
        unit: 'W'
      },
      {
        title: 'Temperature',
        type: 'line',
        dataKey: 'temperature',
        yAxisLabel: 'Temperature (°C)',
        color: '#EF4444',
        unit: '°C'
      }
    ];
  };

  const chartConfigs = getChartConfigs(equipmentId);

  // Filter data based on selected time range
  const filteredData = data.slice(-selectedTimeRange);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Real-Time Data</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="timeRange" className="text-sm font-medium text-gray-700">
            Time Range:
          </label>
          <select
            id="timeRange"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={6}>Last 6 hours</option>
            <option value={12}>Last 12 hours</option>
            <option value={24}>Last 24 hours</option>
            <option value={48}>Last 48 hours</option>
          </select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartConfigs.map((config) => (
          <div
            key={config.dataKey}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <RealTimeChart
              data={filteredData}
              config={config}
              height={250}
              showGrid={true}
              showArea={config.type === 'area'}
            />
          </div>
        ))}
      </div>

      {/* Data Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartConfigs.slice(0, 4).map((config) => {
            const values = filteredData.map(d => d[config.dataKey as keyof HistoricalData] as number).filter(v => v !== undefined);
            const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
            const max = values.length > 0 ? Math.max(...values) : 0;
            const min = values.length > 0 ? Math.min(...values) : 0;
            
            return (
              <div key={config.dataKey} className="text-center">
                <div className="text-sm text-gray-600 mb-1">{config.title}</div>
                <div className="text-2xl font-bold" style={{ color: config.color }}>
                  {avg.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">
                  {config.unit} (avg)
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Max: {max.toFixed(1)} | Min: {min.toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EquipmentChart; 