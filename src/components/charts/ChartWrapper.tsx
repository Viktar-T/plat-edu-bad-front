import React, { useRef } from 'react';
import { Loading } from '../common';
import { 
  exportChartAsCsv, 
  exportChartAsPng, 
  exportChartAsSvg, 
  generateFilename 
} from '../../utils/chartUtils';
import type { BaseChartProps, ChartExportOptions } from '../../types';

interface ChartWrapperProps extends BaseChartProps {
  /** Chart content to render */
  children: React.ReactNode;
  /** Export options */
  exportOptions?: ChartExportOptions;
}

/**
 * Reusable chart wrapper component that handles common functionality
 * like loading states, error handling, export options, and accessibility
 */
const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  data,
  height = 300,
  loading = false,
  error,
  className = '',
  showExport = false,
  showLegend = true,
  ariaLabel,
  exportOptions = {},
  children
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = (type: 'png' | 'svg' | 'csv') => {
    const filename = generateFilename(title.toLowerCase().replace(/\s+/g, '-'));
    
    switch (type) {
      case 'png':
        if (chartRef.current) {
          exportChartAsPng(chartRef as React.RefObject<HTMLDivElement>, filename);
        }
        break;
      case 'svg':
        if (chartRef.current) {
          exportChartAsSvg(chartRef as React.RefObject<HTMLDivElement>, filename);
        }
        break;
      case 'csv':
        exportChartAsCsv(data, filename);
        break;
    }
  };

  if (loading) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 ${className}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className="flex items-center justify-center" style={{ height }}>
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 ${className}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div 
          className="flex items-center justify-center text-red-600"
          style={{ height }}
          role="alert"
          aria-live="polite"
        >
          <div className="text-center">
            <svg 
              className="w-12 h-12 mx-auto mb-2 text-red-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
            <p className="text-sm font-medium">Error loading chart</p>
            <p className="text-xs text-gray-500 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 ${className}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div 
          className="flex items-center justify-center text-gray-500"
          style={{ height }}
          role="status"
          aria-live="polite"
        >
          <div className="text-center">
            <svg 
              className="w-12 h-12 mx-auto mb-2 text-gray-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
            <p className="text-sm font-medium">No data available</p>
            <p className="text-xs text-gray-400 mt-1">Select a different time range or check your data source</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={chartRef}
      className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 ${className}`}
      role="region"
      aria-label={ariaLabel || `${title} chart`}
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        
        {/* Export Options */}
        {showExport && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Export:</span>
            <div className="flex space-x-1">
              {exportOptions.exportAsPng && (
                <button
                  onClick={() => handleExport('png')}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Export as PNG"
                  aria-label="Export chart as PNG image"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              {exportOptions.exportAsSvg && (
                <button
                  onClick={() => handleExport('svg')}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Export as SVG"
                  aria-label="Export chart as SVG image"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              {exportOptions.exportAsCsv && (
                <button
                  onClick={() => handleExport('csv')}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Export as CSV"
                  aria-label="Export chart data as CSV"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chart Content */}
      <div style={{ height }}>
        {children}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Data points: {data.length} | Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartWrapper; 