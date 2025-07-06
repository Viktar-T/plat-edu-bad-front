import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import ChartWrapper from './ChartWrapper';
import { getDefaultColors } from '../../utils/chartUtils';
import type { BarChartProps } from '../../types';

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    color?: string;
    name?: string;
    value?: number | string;
    dataKey?: string;
  }>;
  label?: string | number;
  units?: Record<string, string>;
  tooltipFormatter?: (value: number | string, name: string) => string;
};

/**
 * Custom tooltip component for bar charts
 */
const CustomTooltip = ({
  active,
  payload,
  label,
  units = {},
  tooltipFormatter
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm text-gray-600 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {tooltipFormatter
              ? tooltipFormatter(entry.value ?? '', entry.name ?? '')
              : `${entry.value}${units[entry.dataKey ?? ''] || ''}`
            }
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * BarChart component for comparative data visualization
 * Supports multiple data series, stacked bars, and customizable styling
 */
const BarChart: React.FC<BarChartProps> = ({
  title,
  subtitle,
  data,
  xKey,
  dataKeys,
  xAxisLabel,
  yAxisLabel,
  stacked = false,
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
        <RechartsBarChart 
          data={data} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          )}
          
          <XAxis
            dataKey={xKey}
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
            
            return (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                fill={color}
                stackId={stacked ? 'stack' : undefined}
                radius={[4, 4, 0, 0]}
                name={dataKey}
              />
            );
          })}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default BarChart; 