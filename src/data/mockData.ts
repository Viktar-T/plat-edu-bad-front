import type { ChartData } from '../types';

/**
 * Mock data for renewable energy monitoring platform
 * Provides realistic data for development and demonstration purposes
 */

// Generate time-series data for the last 24 hours
const generateTimeSeriesData = (hours: number = 24): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    
    // Simulate realistic renewable energy data with some variation
    const hour = timestamp.getHours();
    const isDaytime = hour >= 6 && hour <= 18;
    const solarMultiplier = isDaytime ? Math.sin((hour - 6) * Math.PI / 12) * 0.8 + 0.2 : 0;
    const windMultiplier = 0.3 + Math.sin(hour * 0.5) * 0.4 + Math.random() * 0.3;
    
    data.push({
      x: timestamp.toISOString(),
      timestamp: timestamp.toISOString(),
      solarPower: Math.round((Math.random() * 200 + 800) * solarMultiplier),
      windPower: Math.round((Math.random() * 300 + 400) * windMultiplier),
      batteryPower: Math.round(Math.random() * 200 + 100),
      gridPower: Math.round(Math.random() * 150 + 50),
      totalPower: 0, // Will be calculated
      voltage: Math.round((Math.random() * 20 + 220) * 10) / 10,
      current: Math.round((Math.random() * 5 + 2) * 10) / 10,
      temperature: Math.round((Math.random() * 15 + 20) * 10) / 10,
      efficiency: Math.round((Math.random() * 15 + 85) * 10) / 10,
      frequency: Math.round((Math.random() * 0.4 + 49.8) * 100) / 100,
      batterySOC: Math.round((Math.random() * 20 + 70) * 10) / 10,
      humidity: Math.round((Math.random() * 20 + 40) * 10) / 10
    });
  }
  
  // Calculate total power for each data point
  return data.map(point => ({
    ...point,
    totalPower: (Number(point.solarPower) || 0) + (Number(point.windPower) || 0) + (Number(point.batteryPower) || 0) + (Number(point.gridPower) || 0)
  }));
};

// Equipment-specific time series data
export const solarPanelData = generateTimeSeriesData().map(point => ({
  x: point.timestamp,
  timestamp: point.timestamp,
  power: point.solarPower,
  voltage: point.voltage,
  current: point.current,
  temperature: point.temperature,
  efficiency: point.efficiency
}));

export const windTurbineData = generateTimeSeriesData().map(point => ({
  x: point.timestamp,
  timestamp: point.timestamp,
  power: point.windPower,
  voltage: point.voltage,
  current: point.current,
  temperature: point.temperature,
  efficiency: point.efficiency,
  frequency: point.frequency
}));

export const batteryData = generateTimeSeriesData().map(point => ({
  x: point.timestamp,
  timestamp: point.timestamp,
  power: point.batteryPower,
  voltage: point.voltage,
  current: point.current,
  temperature: point.temperature,
  soc: point.batterySOC,
  efficiency: point.efficiency
}));

export const inverterData = generateTimeSeriesData().map(point => ({
  x: point.timestamp,
  timestamp: point.timestamp,
  inputPower: (Number(point.solarPower) || 0) + (Number(point.windPower) || 0),
  outputPower: point.totalPower,
  voltage: point.voltage,
  current: point.current,
  temperature: point.temperature,
  efficiency: point.efficiency,
  frequency: point.frequency
}));

// Categorical data for bar charts
export const energySourceComparison: ChartData[] = [
  { x: 'Solar PV', source: 'Solar PV', power: 850, efficiency: 92, cost: 0.12, capacity: 1000 },
  { x: 'Wind Turbine', source: 'Wind Turbine', power: 650, efficiency: 78, cost: 0.08, capacity: 800 },
  { x: 'Battery Storage', source: 'Battery Storage', power: 400, efficiency: 95, cost: 0.15, capacity: 500 },
  { x: 'Grid Import', source: 'Grid Import', power: 200, efficiency: 88, cost: 0.18, capacity: 300 },
  { x: 'Hydro Generator', source: 'Hydro Generator', power: 300, efficiency: 85, cost: 0.10, capacity: 400 }
];

export const monthlyEnergyProduction: ChartData[] = [
  { x: 'Jan', month: 'January', solar: 1200, wind: 800, battery: 600, grid: 400 },
  { x: 'Feb', month: 'February', solar: 1100, wind: 900, battery: 550, grid: 450 },
  { x: 'Mar', month: 'March', solar: 1400, wind: 750, battery: 650, grid: 350 },
  { x: 'Apr', month: 'April', solar: 1600, wind: 700, battery: 700, grid: 300 },
  { x: 'May', month: 'May', solar: 1800, wind: 650, battery: 750, grid: 250 },
  { x: 'Jun', month: 'June', solar: 2000, wind: 600, battery: 800, grid: 200 }
];

// Proportional data for pie charts
export const energyDistribution: ChartData[] = [
  { x: 'Solar PV', source: 'Solar PV', percentage: 45, power: 850, color: '#3B82F6' },
  { x: 'Wind Turbine', source: 'Wind Turbine', percentage: 30, power: 650, color: '#10B981' },
  { x: 'Battery Storage', source: 'Battery Storage', percentage: 15, power: 400, color: '#F59E0B' },
  { x: 'Grid Import', source: 'Grid Import', percentage: 10, power: 200, color: '#EF4444' }
];

export const systemEfficiencyBreakdown: ChartData[] = [
  { x: 'Solar Conversion', component: 'Solar Conversion', efficiency: 92, percentage: 35, color: '#3B82F6' },
  { x: 'Wind Conversion', component: 'Wind Conversion', efficiency: 78, percentage: 25, color: '#10B981' },
  { x: 'Battery Storage', component: 'Battery Storage', efficiency: 95, percentage: 20, color: '#F59E0B' },
  { x: 'Inverter', component: 'Inverter', efficiency: 88, percentage: 15, color: '#8B5CF6' },
  { x: 'Grid Interface', component: 'Grid Interface', efficiency: 85, percentage: 5, color: '#EF4444' }
];

// Real-time gauge readings
export const currentReadings = {
  batterySOC: 78,
  systemTemperature: 42,
  gridVoltage: 230.5,
  systemEfficiency: 88.5,
  humidity: 45.2,
  frequency: 49.95
};

// Historical performance data
export const performanceMetrics = {
  dailyAverage: 1850,
  weeklyAverage: 1820,
  monthlyAverage: 1780,
  peakPower: 2100,
  totalEnergy: 43200,
  uptime: 98.5
};

// Equipment status data
export const equipmentStatus = [
  { x: 'Solar Panel 1', equipment: 'Solar Panel 1', status: 'online', power: 850, efficiency: 92 },
  { x: 'Solar Panel 2', equipment: 'Solar Panel 2', status: 'online', power: 820, efficiency: 89 },
  { x: 'Wind Turbine', equipment: 'Wind Turbine', status: 'online', power: 650, efficiency: 78 },
  { x: 'Battery Bank', equipment: 'Battery Bank', status: 'online', power: 400, efficiency: 95 },
  { x: 'Inverter', equipment: 'Inverter', status: 'maintenance', power: 0, efficiency: 0 },
  { x: 'Grid Interface', equipment: 'Grid Interface', status: 'online', power: 200, efficiency: 88 }
];

// Environmental data
export const environmentalData = generateTimeSeriesData().map(point => ({
  x: point.timestamp,
  timestamp: point.timestamp,
  temperature: point.temperature,
  humidity: point.humidity,
  solarIrradiance: point.solarPower ? Number(point.solarPower) / 100 : 0,
  windSpeed: point.windPower ? Number(point.windPower) / 50 : 0
}));

// Cost analysis data
export const costAnalysis: ChartData[] = [
  { x: 'Solar', source: 'Solar', cost: 0.12, savings: 0.08, percentage: 45 },
  { x: 'Wind', source: 'Wind', cost: 0.08, savings: 0.12, percentage: 30 },
  { x: 'Battery', source: 'Battery', cost: 0.15, savings: 0.05, percentage: 15 },
  { x: 'Grid', source: 'Grid', cost: 0.18, savings: 0.02, percentage: 10 }
];

// Maintenance schedule data
export const maintenanceSchedule: ChartData[] = [
  { x: 'Solar Panels', equipment: 'Solar Panels', lastMaintenance: '2024-01-15', nextMaintenance: '2024-04-15', status: 'Good' },
  { x: 'Wind Turbine', equipment: 'Wind Turbine', lastMaintenance: '2024-02-01', nextMaintenance: '2024-05-01', status: 'Good' },
  { x: 'Battery Bank', equipment: 'Battery Bank', lastMaintenance: '2024-01-30', nextMaintenance: '2024-04-30', status: 'Good' },
  { x: 'Inverter', equipment: 'Inverter', lastMaintenance: '2024-02-15', nextMaintenance: '2024-03-15', status: 'Due' },
  { x: 'Grid Interface', equipment: 'Grid Interface', lastMaintenance: '2024-02-10', nextMaintenance: '2024-05-10', status: 'Good' }
];

// Export all data
export const mockData = {
  timeSeries: {
    solarPanel: solarPanelData,
    windTurbine: windTurbineData,
    battery: batteryData,
    inverter: inverterData,
    environmental: environmentalData
  },
  categorical: {
    energySourceComparison,
    monthlyEnergyProduction,
    equipmentStatus,
    maintenanceSchedule
  },
  proportional: {
    energyDistribution,
    systemEfficiencyBreakdown,
    costAnalysis
  },
  realTime: currentReadings,
  performance: performanceMetrics
}; 