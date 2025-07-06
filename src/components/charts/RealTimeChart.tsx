import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import type { HistoricalData, ChartConfig } from '../../types';

interface RealTimeChartProps {
  data: HistoricalData[];
  config: ChartConfig;
  height?: number;
  showGrid?: boolean;
  showArea?: boolean;
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({
  data,
  config,
  height = 300,
  showGrid = true,
  showArea = false
}) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  type CustomTooltipProps = {
    active?: boolean;
    payload?: Array<{
      name?: string;
      value?: number | string;
    }>;
    label?: string;
  };

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">
            {formatTimestamp(label ?? '')}
          </p>
          <p className="text-sm font-medium">
            {dataPoint.name}: {dataPoint.value} {config.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  if (showArea) {
    return (
      <div className="w-full">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{config.title}</h3>
          <p className="text-sm text-gray-600">Real-time {config.dataKey} data</p>
        </div>
        
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            )}
            
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTimestamp}
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ 
                value: config.yAxisLabel, 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey={config.dataKey}
              stroke={config.color}
              strokeWidth={2}
              fill={config.color}
              fillOpacity={0.1}
              dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{config.title}</h3>
        <p className="text-sm text-gray-600">Real-time {config.dataKey} data</p>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          )}
          
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTimestamp}
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ 
              value: config.yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Line
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.color}
            strokeWidth={2}
            dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeChart; 