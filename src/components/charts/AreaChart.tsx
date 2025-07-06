import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import ChartWrapper from './ChartWrapper';
import { formatTimestamp, getDefaultColors } from '../../utils/chartUtils';
import type { AreaChartProps } from '../../types';

/**
 * Custom tooltip component for area charts
 */
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
        <p className="text-sm text-gray-600 mb-2">
          {formatTimestamp(label ?? '')}
        </p>
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
 * AreaChart component for power generation/accumulation visualization
 * Supports multiple data series, stacked areas, and customizable styling
 */
const AreaChart: React.FC<AreaChartProps> = ({
  title,
  subtitle,
  data,
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
        <RechartsAreaChart 
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
            
            return (
              <Area
                key={dataKey}
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                fill={color}
                fillOpacity={0.3}
                stackId={stacked ? 'stack' : undefined}
                dot={{ 
                  fill: color, 
                  strokeWidth: 2, 
                  r: 4 
                }}
                activeDot={{ 
                  r: 6, 
                  stroke: color, 
                  strokeWidth: 2 
                }}
                name={dataKey}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default AreaChart; 