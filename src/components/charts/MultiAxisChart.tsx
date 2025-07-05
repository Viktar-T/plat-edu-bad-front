import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import ChartWrapper from './ChartWrapper';
import { formatTimestamp, getDefaultColors } from '../../utils/chartUtils';
import type { MultiAxisChartProps } from '../../types';

/**
 * Custom tooltip component for multi-axis charts
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
 * MultiAxisChart component for complex data relationships
 * Supports multiple Y-axes for different data types and scales
 */
const MultiAxisChart: React.FC<MultiAxisChartProps> = ({
  title,
  subtitle,
  data,
  primaryDataKeys,
  secondaryDataKeys = [],
  xAxisLabel,
  primaryYAxisLabel,
  secondaryYAxisLabel,
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
        <ComposedChart 
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
          
          {/* Primary Y-axis */}
          <YAxis
            yAxisId="left"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={primaryYAxisLabel ? { 
              value: primaryYAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            } : undefined}
          />
          
          {/* Secondary Y-axis (if needed) */}
          {secondaryDataKeys.length > 0 && (
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={secondaryYAxisLabel ? { 
                value: secondaryYAxisLabel, 
                angle: 90, 
                position: 'insideRight',
                style: { textAnchor: 'middle' }
              } : undefined}
            />
          )}
          
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
          
          {/* Primary data series (lines) */}
          {primaryDataKeys.map((dataKey, index) => {
            const color = colors[index % colors.length];
            
            return (
              <Line
                key={dataKey}
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                yAxisId="left"
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
          
          {/* Secondary data series (bars) */}
          {secondaryDataKeys.map((dataKey, index) => {
            const color = colors[(primaryDataKeys.length + index) % colors.length];
            
            return (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                fill={color}
                yAxisId="right"
                radius={[4, 4, 0, 0]}
                opacity={0.7}
                name={dataKey}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default MultiAxisChart; 