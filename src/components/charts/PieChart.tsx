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

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    color?: string;
    name?: string;
    value?: number | string;
    dataKey?: string;
  }>;
  label?: string | number;
  tooltipFormatter?: (value: number | string, name: string) => string;
};

/**
 * Custom tooltip component for pie charts
 */
const CustomTooltip = ({
  active,
  payload,
  label,
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
              : `${entry.value}`
            }
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Custom label component for pie charts
 */
type CustomLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  value?: number;
  showPercentage?: boolean;
  showValue?: boolean;
};

const CustomLabel = ({ 
  cx = 0, 
  cy = 0, 
  midAngle = 0, 
  innerRadius = 0, 
  outerRadius = 80, 
  percent = 0, 
  value = 0,
  showPercentage = true,
  showValue = false
}: CustomLabelProps) => {
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