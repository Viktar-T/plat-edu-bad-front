import React, { useState, useEffect } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  GaugeChart,
  MultiAxisChart
} from '../../components/charts';
import type { ChartData } from '../../types';

/**
 * Charts Demo Page
 * Showcases all available chart components with sample data and usage examples
 */
const ChartsDemo: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for real-time charts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sample time-series data for line, area, and multi-axis charts
  const generateTimeSeriesData = (hours: number = 24): ChartData[] => {
    const data: ChartData[] = [];
    const now = new Date();
    
    for (let i = hours; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        x: timestamp.toISOString(),
        timestamp: timestamp.toISOString(),
        power: Math.random() * 1000 + 500,
        voltage: Math.random() * 50 + 220,
        current: Math.random() * 5 + 2,
        temperature: Math.random() * 20 + 15,
        efficiency: Math.random() * 20 + 80,
        frequency: Math.random() * 2 + 49.5
      });
    }
    
    return data;
  };

  // Sample categorical data for bar charts
  const generateBarData = (): ChartData[] => [
    { x: 'Solar', category: 'Solar', power: 850, efficiency: 92, cost: 0.12 },
    { x: 'Wind', category: 'Wind', power: 650, efficiency: 78, cost: 0.08 },
    { x: 'Battery', category: 'Battery', power: 400, efficiency: 95, cost: 0.15 },
    { x: 'Grid', category: 'Grid', power: 200, efficiency: 88, cost: 0.18 },
    { x: 'Hydro', category: 'Hydro', power: 300, efficiency: 85, cost: 0.10 }
  ];

  // Sample proportional data for pie charts
  const generatePieData = (): ChartData[] => [
    { x: 'Solar PV', source: 'Solar PV', percentage: 45, power: 850 },
    { x: 'Wind Turbine', source: 'Wind Turbine', percentage: 30, power: 650 },
    { x: 'Battery Storage', source: 'Battery Storage', percentage: 15, power: 400 },
    { x: 'Grid Import', source: 'Grid Import', percentage: 10, power: 200 }
  ];

  const timeSeriesData = generateTimeSeriesData();
  const barData = generateBarData();
  const pieData = generatePieData();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Charts Demo
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive data visualization components for the educational platform
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {currentTime.toLocaleTimeString()}
          </p>
        </div>

        {/* Chart Grid */}
        <div className="space-y-8">
          {/* Line Charts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Line Charts - Time Series Data
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart
                title="Power Output Over Time"
                subtitle="Real-time power generation from renewable sources"
                data={timeSeriesData}
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
                ariaLabel="Power output line chart showing real-time generation data"
              />
              
              <LineChart
                title="Multiple Parameters"
                subtitle="Voltage, current, and temperature monitoring"
                data={timeSeriesData}
                dataKeys={['voltage', 'current', 'temperature']}
                xAxisLabel="Time"
                yAxisLabel="Value"
                units={{ voltage: 'V', current: 'A', temperature: '°C' }}
                height={300}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsCsv: true
                }}
                ariaLabel="Multi-parameter line chart showing voltage, current, and temperature"
              />
            </div>
          </section>

          {/* Area Charts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Area Charts - Power Accumulation
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AreaChart
                title="Power Generation Accumulation"
                subtitle="Cumulative power generation over time"
                data={timeSeriesData}
                dataKeys={['power']}
                xAxisLabel="Time"
                yAxisLabel="Power (W)"
                units={{ power: 'W' }}
                height={300}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsSvg: true
                }}
                ariaLabel="Power generation area chart showing cumulative output"
              />
              
              <AreaChart
                title="Stacked Energy Sources"
                subtitle="Multiple energy sources contribution"
                data={timeSeriesData}
                dataKeys={['power', 'efficiency']}
                xAxisLabel="Time"
                yAxisLabel="Value"
                units={{ power: 'W', efficiency: '%' }}
                stacked={true}
                height={300}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsCsv: true
                }}
                ariaLabel="Stacked area chart showing multiple energy sources"
              />
            </div>
          </section>

          {/* Bar Charts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bar Charts - Comparative Data
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart
                title="Energy Source Comparison"
                subtitle="Power output by energy source"
                data={barData}
                xKey="category"
                dataKeys={['power']}
                xAxisLabel="Energy Source"
                yAxisLabel="Power (W)"
                units={{ power: 'W' }}
                height={300}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsCsv: true
                }}
                ariaLabel="Bar chart comparing power output by energy source"
              />
              
              <BarChart
                title="Multiple Metrics Comparison"
                subtitle="Power, efficiency, and cost by source"
                data={barData}
                xKey="category"
                dataKeys={['power', 'efficiency', 'cost']}
                xAxisLabel="Energy Source"
                yAxisLabel="Value"
                units={{ power: 'W', efficiency: '%', cost: '$/kWh' }}
                height={300}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsSvg: true,
                  exportAsCsv: true
                }}
                ariaLabel="Multi-metric bar chart showing power, efficiency, and cost"
              />
            </div>
          </section>

          {/* Pie Charts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Pie Charts - Proportional Data
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PieChart
                title="Energy Source Distribution"
                subtitle="Percentage contribution by source"
                data={pieData}
                dataKey="percentage"
                nameKey="source"
                showPercentage={true}
                showValue={false}
                height={300}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsSvg: true,
                  exportAsCsv: true
                }}
                ariaLabel="Pie chart showing energy source distribution"
              />
              
              <PieChart
                title="Power Generation Donut"
                subtitle="Power output by source (donut chart)"
                data={pieData}
                dataKey="power"
                nameKey="source"
                showPercentage={false}
                showValue={true}
                innerRadius={40}
                outerRadius={80}
                height={300}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsSvg: true
                }}
                ariaLabel="Donut chart showing power generation by source"
              />
            </div>
          </section>

          {/* Gauge Charts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Gauge Charts - Real-time Readings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GaugeChart
                title="Battery State of Charge"
                subtitle="Current battery level"
                data={timeSeriesData}
                value={75}
                min={0}
                max={100}
                unit="%"
                warningThreshold={20}
                criticalThreshold={10}
                height={250}
                size={150}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsSvg: true
                }}
                ariaLabel="Battery state of charge gauge showing 75%"
              />
              
              <GaugeChart
                title="System Temperature"
                subtitle="Current operating temperature"
                data={timeSeriesData}
                value={45}
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
                ariaLabel="System temperature gauge showing 45°C"
              />
              
              <GaugeChart
                title="Grid Voltage"
                subtitle="Current grid voltage"
                data={timeSeriesData}
                value={230}
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
                ariaLabel="Grid voltage gauge showing 230V"
              />
              
              <GaugeChart
                title="System Efficiency"
                subtitle="Overall system efficiency"
                data={timeSeriesData}
                value={88}
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
                ariaLabel="System efficiency gauge showing 88%"
              />
            </div>
          </section>

          {/* Multi-Axis Charts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Multi-Axis Charts - Complex Relationships
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <MultiAxisChart
                title="Temperature vs Power Output"
                subtitle="Relationship between temperature and power generation"
                data={timeSeriesData}
                primaryDataKeys={['temperature']}
                secondaryDataKeys={['power']}
                xAxisLabel="Time"
                primaryYAxisLabel="Temperature (°C)"
                secondaryYAxisLabel="Power (W)"
                units={{ temperature: '°C', power: 'W' }}
                height={400}
                showExport={true}
                exportOptions={{
                  exportAsPng: true,
                  exportAsSvg: true,
                  exportAsCsv: true
                }}
                ariaLabel="Multi-axis chart showing temperature and power relationship"
              />
            </div>
          </section>

          {/* Usage Examples Section */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Usage Examples
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Basic Line Chart
                </h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`<LineChart
  title="Power Output"
  data={data}
  dataKeys={['power']}
  yAxisLabel="Power (W)"
  units={{ power: 'W' }}
  height={300}
  showExport={true}
/>`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Gauge Chart with Thresholds
                </h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`<GaugeChart
  title="Battery Level"
  data={data}
  value={75}
  min={0}
  max={100}
  unit="%"
  warningThreshold={20}
  criticalThreshold={10}
  height={300}
/>`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChartsDemo; 