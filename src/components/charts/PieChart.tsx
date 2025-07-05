import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import ChartWrapper from './ChartWrapper';
import { getDefaultColors } from '../../utils/chartUtils';
import type { PieChartProps } from '../../types';

/**
 * Custom tooltip component for pie charts
 */
const CustomTooltip = ({ 
  active, 
  payload, 
  tooltipFormatter 
}: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium" style={{ color: data.color }}>
          {data.name}
        </p>
        <p className="text-sm text-gray-600">
          {tooltipFormatter 
            ? tooltipFormatter(data.value, data.name)
            : `${data.value} (${data.payload.percent?.toFixed(1)}%)`
          }
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Custom label component for pie charts
 */
const CustomLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent, 
  value,
  showPercentage = true,
  showValue = false
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show labels for segments that are large enough
  if (percent < 0.05) return null;

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {showValue && `${value}`}
      {showPercentage && `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/**
 * PieChart component for proportional data visualization
 * Supports donut charts, percentage labels, and customizable styling
 */
const PieChart: React.FC<PieChartProps> = ({
  title,
  subtitle,
  data,
  dataKey,
  nameKey,
  showPercentage = true,
  showValue = false,
  innerRadius = 0,
  outerRadius = 80,
  tooltipFormatter,
  height = 300,
  loading = false,
  error,
  className = '',
  showExport = false,
  colors = getDefaultColors(),
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

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + (item[dataKey] as number || 0), 0);

  // Add percentage to data
  const dataWithPercent = data.map(item => ({
    ...item,
    percent: total > 0 ? (item[dataKey] as number || 0) / total : 0
  }));

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
        <RechartsPieChart>
          <Pie
            data={dataWithPercent}
            cx="50%"
            cy="50%"
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            label={
              (showPercentage || showValue) 
                ? (props) => (
                    <CustomLabel 
                      {...props} 
                      showPercentage={showPercentage}
                      showValue={showValue}
                    />
                  )
                : undefined
            }
          >
            {dataWithPercent.map((_entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          
          <Tooltip content={<CustomTooltip tooltipFormatter={tooltipFormatter} />} />
          
          {showLegend && (
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ paddingTop: '10px' }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default PieChart; 