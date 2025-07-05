import React, { useState, useEffect } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  GaugeChart,
  MultiAxisChart
} from '../../components/charts';
import {
  mockData,
  currentReadings,
  performanceMetrics
} from '../../data/mockData';
import type { ChartData } from '../../types';

/**
 * Dashboard Page Component
 * 
 * Displays comprehensive monitoring dashboard with real-time data,
 * historical trends, and system performance metrics using chart components.
 */
const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState<number>(24);

  // Update current time every second for real-time displays
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter data based on selected time range
  const getFilteredTimeSeriesData = (data: ChartData[]) => {
    return data.slice(-selectedTimeRange);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                System Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Real-time monitoring and analytics for renewable energy systems
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {currentTime.toLocaleTimeString()}
              </p>
            </div>
            
            {/* Time Range Selector */}
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
        </div>

        {/* Real-Time Gauges Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Real-Time System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GaugeChart
              title="Battery State of Charge"
              subtitle="Current battery level"
              data={mockData.timeSeries.battery}
              value={currentReadings.batterySOC}
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
              ariaLabel="Battery state of charge gauge showing current level"
            />
            
            <GaugeChart
              title="System Temperature"
              subtitle="Current operating temperature"
              data={mockData.timeSeries.environmental}
              value={currentReadings.systemTemperature}
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
              ariaLabel="System temperature gauge showing current temperature"
            />
            
            <GaugeChart
              title="Grid Voltage"
              subtitle="Current grid voltage"
              data={mockData.timeSeries.inverter}
              value={currentReadings.gridVoltage}
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
              ariaLabel="Grid voltage gauge showing current voltage"
            />
            
            <GaugeChart
              title="System Efficiency"
              subtitle="Overall system efficiency"
              data={mockData.timeSeries.inverter}
              value={currentReadings.systemEfficiency}
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
              ariaLabel="System efficiency gauge showing current efficiency"
            />
          </div>
        </section>

        {/* Power Generation Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Power Generation Overview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart
              title="Total Power Generation"
              subtitle="Real-time power output from all sources"
              data={getFilteredTimeSeriesData(mockData.timeSeries.solarPanel)}
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
              ariaLabel="Total power generation line chart showing real-time output"
            />
            
            <AreaChart
              title="Energy Source Contribution"
              subtitle="Cumulative power from different sources"
              data={getFilteredTimeSeriesData(mockData.timeSeries.solarPanel)}
              dataKeys={['power']}
              xAxisLabel="Time"
              yAxisLabel="Power (W)"
              units={{ power: 'W' }}
              stacked={true}
              height={300}
              showExport={true}
              exportOptions={{
                exportAsPng: true,
                exportAsCsv: true
              }}
              ariaLabel="Energy source contribution area chart showing cumulative power"
            />
          </div>
        </section>

        {/* Energy Source Comparison */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Energy Source Comparison
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChart
              title="Power Output by Source"
              subtitle="Current power generation by energy source"
              data={mockData.categorical.energySourceComparison}
              xKey="source"
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
              ariaLabel="Power output bar chart comparing different energy sources"
            />
            
            <PieChart
              title="Energy Distribution"
              subtitle="Percentage contribution by source"
              data={mockData.proportional.energyDistribution}
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
              ariaLabel="Energy distribution pie chart showing source percentages"
            />
          </div>
        </section>

        {/* System Performance Metrics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            System Performance Metrics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MultiAxisChart
              title="Temperature vs Power Output"
              subtitle="Relationship between temperature and power generation"
              data={getFilteredTimeSeriesData(mockData.timeSeries.environmental)}
              primaryDataKeys={['temperature']}
              secondaryDataKeys={['solarIrradiance']}
              xAxisLabel="Time"
              primaryYAxisLabel="Temperature (°C)"
              secondaryYAxisLabel="Solar Irradiance (W/m²)"
              units={{ temperature: '°C', solarIrradiance: 'W/m²' }}
              height={400}
              showExport={true}
              exportOptions={{
                exportAsPng: true,
                exportAsSvg: true,
                exportAsCsv: true
              }}
              ariaLabel="Multi-axis chart showing temperature and power relationship"
            />
            
            <BarChart
              title="Monthly Energy Production"
              subtitle="Energy production by source over months"
              data={mockData.categorical.monthlyEnergyProduction}
              xKey="month"
              dataKeys={['solar', 'wind', 'battery', 'grid']}
              xAxisLabel="Month"
              yAxisLabel="Energy (kWh)"
              units={{ solar: 'kWh', wind: 'kWh', battery: 'kWh', grid: 'kWh' }}
              stacked={true}
              height={400}
              showExport={true}
              exportOptions={{
                exportAsPng: true,
                exportAsSvg: true,
                exportAsCsv: true
              }}
              ariaLabel="Monthly energy production stacked bar chart"
            />
          </div>
        </section>

        {/* Performance Summary Cards */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Daily Average</div>
              <div className="text-2xl font-bold text-blue-600">
                {performanceMetrics.dailyAverage} W
              </div>
              <div className="text-xs text-gray-500">Power generation</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Peak Power</div>
              <div className="text-2xl font-bold text-green-600">
                {performanceMetrics.peakPower} W
              </div>
              <div className="text-xs text-gray-500">Maximum output</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Total Energy</div>
              <div className="text-2xl font-bold text-purple-600">
                {performanceMetrics.totalEnergy} kWh
              </div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">System Uptime</div>
              <div className="text-2xl font-bold text-orange-600">
                {performanceMetrics.uptime}%
              </div>
              <div className="text-xs text-gray-500">Availability</div>
            </div>
          </div>
        </section>

        {/* System Efficiency Breakdown */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            System Efficiency Breakdown
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PieChart
              title="Component Efficiency"
              subtitle="Efficiency breakdown by system component"
              data={mockData.proportional.systemEfficiencyBreakdown}
              dataKey="efficiency"
              nameKey="component"
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
              ariaLabel="System efficiency breakdown donut chart"
            />
            
            <LineChart
              title="Efficiency Trends"
              subtitle="System efficiency over time"
              data={getFilteredTimeSeriesData(mockData.timeSeries.inverter)}
              dataKeys={['efficiency']}
              xAxisLabel="Time"
              yAxisLabel="Efficiency (%)"
              units={{ efficiency: '%' }}
              height={300}
              showExport={true}
              exportOptions={{
                exportAsPng: true,
                exportAsCsv: true
              }}
              ariaLabel="Efficiency trends line chart showing system performance over time"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard; 