import React from 'react';
import ChartWrapper from './ChartWrapper';
import { getGaugeColor } from '../../utils/chartUtils';
import type { GaugeChartProps } from '../../types';

/**
 * GaugeChart component for real-time readings visualization
 * Displays current value with customizable thresholds and color ranges
 */
const GaugeChart: React.FC<GaugeChartProps> = ({
  title,
  subtitle,
  data,
  value,
  min,
  max,
  unit,
  warningThreshold,
  criticalThreshold,
  size = 200,
  colorRanges,
  height = 300,
  loading = false,
  error,
  className = '',
  showExport = false,
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
        ariaLabel={ariaLabel}
        exportOptions={exportOptions}
      >
        <div />
      </ChartWrapper>
    );
  }

  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  const angle = (percentage / 100) * 180; // Convert percentage to degrees (0-180)
  const color = getGaugeColor(value, min, max, warningThreshold, criticalThreshold, colorRanges);

  // Calculate position for the needle
  const needleLength = size * 0.4;
  const needleX = size / 2 + needleLength * Math.cos((angle - 90) * Math.PI / 180);
  const needleY = size / 2 + needleLength * Math.sin((angle - 90) * Math.PI / 180);

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
      ariaLabel={ariaLabel}
      exportOptions={exportOptions}
    >
      <div className="flex items-center justify-center h-full">
        <div className="relative" style={{ width: size, height: size }}>
          {/* Gauge Background */}
          <svg width={size} height={size} className="absolute inset-0">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size * 0.35}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={size * 0.08}
              strokeDasharray={`${Math.PI * size * 0.35} ${Math.PI * size * 0.35}`}
              strokeDashoffset={Math.PI * size * 0.35}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            
            {/* Value arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size * 0.35}
              fill="none"
              stroke={color}
              strokeWidth={size * 0.08}
              strokeDasharray={`${(Math.PI * size * 0.35 * angle) / 180} ${Math.PI * size * 0.35}`}
              strokeDashoffset={Math.PI * size * 0.35}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="round"
            />
            
            {/* Threshold markers */}
            {warningThreshold && (
              <line
                x1={size / 2}
                y1={size / 2}
                x2={size / 2 + (size * 0.35) * Math.cos(((warningThreshold - min) / (max - min) * 180 - 90) * Math.PI / 180)}
                y2={size / 2 + (size * 0.35) * Math.sin(((warningThreshold - min) / (max - min) * 180 - 90) * Math.PI / 180)}
                stroke="#f59e0b"
                strokeWidth={3}
                strokeDasharray="5,5"
              />
            )}
            
            {criticalThreshold && (
              <line
                x1={size / 2}
                y1={size / 2}
                x2={size / 2 + (size * 0.35) * Math.cos(((criticalThreshold - min) / (max - min) * 180 - 90) * Math.PI / 180)}
                y2={size / 2 + (size * 0.35) * Math.sin(((criticalThreshold - min) / (max - min) * 180 - 90) * Math.PI / 180)}
                stroke="#ef4444"
                strokeWidth={3}
                strokeDasharray="5,5"
              />
            )}
            
            {/* Needle */}
            <line
              x1={size / 2}
              y1={size / 2}
              x2={needleX}
              y2={needleY}
              stroke="#374151"
              strokeWidth={4}
              strokeLinecap="round"
            />
            
            {/* Center dot */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={8}
              fill="#374151"
            />
          </svg>
          
          {/* Value display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-800">
              {value.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">
              {unit}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {percentage.toFixed(0)}%
            </div>
          </div>
          
          {/* Min/Max labels */}
          <div className="absolute bottom-0 left-0 text-xs text-gray-500">
            {min} {unit}
          </div>
          <div className="absolute bottom-0 right-0 text-xs text-gray-500">
            {max} {unit}
          </div>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
          <div 
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: color }}
          />
          {criticalThreshold && value >= criticalThreshold && 'Critical'}
          {warningThreshold && value >= warningThreshold && value < (criticalThreshold || Infinity) && 'Warning'}
          {(!warningThreshold || value < warningThreshold) && 'Normal'}
        </div>
      </div>
    </ChartWrapper>
  );
};

export default GaugeChart; 