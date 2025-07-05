import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart as RechartsAreaChart
} from 'recharts';
import ChartWrapper from './ChartWrapper';
import { formatTimestamp, getDefaultColors } from '../../utils/chartUtils';
import type { LineChartProps } from '../../types';

/**
 * Custom tooltip component for line charts
 */
const CustomTooltip = ({ 
  active, 
  payload, 
  label, 
  units = {},
  tooltipFormatter 
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm text-gray-600 mb-2">
          {formatTimestamp(label)}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {tooltipFormatter 
              ? tooltipFormatter(entry.value, entry.name)
              : `${entry.value}${units[entry.dataKey] || ''}`
            }
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * LineChart component for time-series data visualization
 * Supports multiple data series, area charts, and customizable styling
 */
const LineChart: React.FC<LineChartProps> = ({
  title,
  subtitle,
  data,
  dataKeys,
  xAxisLabel,
  yAxisLabel,
  showArea = false,
  showDots = true,
  units = {},
  tooltipFormatter,
  height = 300,
  loading = false,
  error,
  className = '',
  showExport = false,
  colors = getDefaultColors(),
  showGrid = true,
  showLegend = true,
  ariaLabel,
  exportOptions = {}
}) => {
  // Validate data
  if (!data || data.length === 0) {
    return (
      <ChartWrapper
        title={title}
        subtitle={subtitle}
        data={data}
        height={height}
        loading={loading}
        error={error}
        className={className}
        showExport={showExport}
        showLegend={showLegend}
        ariaLabel={ariaLabel}
        exportOptions={exportOptions}
      >
        <div />
      </ChartWrapper>
    );
  }

  const ChartComponent = showArea ? RechartsAreaChart : RechartsLineChart;

  return (
    <ChartWrapper
      title={title}
      subtitle={subtitle}
      data={data}
      height={height}
      loading={loading}
      error={error}
      className={className}
      showExport={showExport}
      showLegend={showLegend}
      ariaLabel={ariaLabel}
      exportOptions={exportOptions}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent 
          data={data} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
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
            label={xAxisLabel ? { 
              value: xAxisLabel, 
              position: 'bottom',
              offset: 0,
              style: { textAnchor: 'middle' }
            } : undefined}
          />
          
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={yAxisLabel ? { 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            } : undefined}
          />
          
          <Tooltip content={
            <CustomTooltip 
              units={units} 
              tooltipFormatter={tooltipFormatter}
            />
          } />
          
          {showLegend && (
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ paddingBottom: '10px' }}
            />
          )}
          
          {dataKeys.map((dataKey, index) => {
            const color = colors[index % colors.length];
            
            if (showArea) {
              return (
                <Area
                  key={dataKey}
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  strokeWidth={2}
                  fill={color}
                  fillOpacity={0.1}
                  dot={showDots ? { 
                    fill: color, 
                    strokeWidth: 2, 
                    r: 4 
                  } : false}
                  activeDot={{ 
                    r: 6, 
                    stroke: color, 
                    strokeWidth: 2 
                  }}
                  name={dataKey}
                />
              );
            }
            
            return (
              <Line
                key={dataKey}
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={showDots ? { 
                  fill: color, 
                  strokeWidth: 2, 
                  r: 4 
                } : false}
                activeDot={{ 
                  r: 6, 
                  stroke: color, 
                  strokeWidth: 2 
                }}
                name={dataKey}
              />
            );
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default LineChart; 