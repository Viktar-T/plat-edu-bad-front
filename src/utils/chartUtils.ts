import type { ChartData } from '../types';

/**
 * Export chart data as CSV
 */
export const exportChartAsCsv = (
  data: ChartData[],
  filename: string = 'chart-data'
): void => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get all unique keys from the data
  const keys = Array.from(
    new Set(data.flatMap(item => Object.keys(item)))
  );

  // Create CSV header
  const csvHeader = keys.join(',');
  
  // Create CSV rows
  const csvRows = data.map(item => 
    keys.map(key => {
      const value = item[key];
      // Handle values that contain commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );

  // Combine header and rows
  const csvContent = [csvHeader, ...csvRows].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export chart as PNG image
 */
export const exportChartAsPng = (
  chartRef: React.RefObject<HTMLDivElement>,
  filename: string = 'chart'
): void => {
  if (!chartRef.current) {
    console.warn('Chart reference not found');
    return;
  }

  import('html2canvas').then(({ default: html2canvas }) => {
    html2canvas(chartRef.current!, {
      background: '#ffffff',
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }).catch(error => {
    console.error('Failed to export as PNG:', error);
    alert('PNG export requires html2canvas library. Please install it first.');
  });
};

/**
 * Export chart as SVG image
 */
export const exportChartAsSvg = (
  chartRef: React.RefObject<HTMLDivElement>,
  filename: string = 'chart'
): void => {
  if (!chartRef.current) {
    console.warn('Chart reference not found');
    return;
  }

  const svgElement = chartRef.current.querySelector('svg');
  if (!svgElement) {
    console.warn('SVG element not found in chart');
    return;
  }

  // Clone the SVG to avoid modifying the original
  const clonedSvg = svgElement.cloneNode(true) as SVGElement;
  
  // Set background color
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('fill', '#ffffff');
  clonedSvg.insertBefore(rect, clonedSvg.firstChild);

  // Convert SVG to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clonedSvg);
  
  // Create data URL
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  // Download file
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.svg`;
  link.click();
  
  // Clean up
  URL.revokeObjectURL(url);
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: string | number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * Format date for display
 */
export const formatDate = (timestamp: string | number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get default chart colors
 */
export const getDefaultColors = (): string[] => [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280'  // Gray
];

/**
 * Get color for gauge based on value and thresholds
 */
export const getGaugeColor = (
  value: number,
  min: number,
  max: number,
  warningThreshold?: number,
  criticalThreshold?: number,
  customRanges?: { min: number; max: number; color: string }[]
): string => {
  // Use custom ranges if provided
  if (customRanges) {
    const range = customRanges.find(r => value >= r.min && value <= r.max);
    if (range) return range.color;
  }

  // Use default thresholds
  const percentage = ((value - min) / (max - min)) * 100;
  
  if (criticalThreshold && value >= criticalThreshold) {
    return '#EF4444'; // Red
  }
  
  if (warningThreshold && value >= warningThreshold) {
    return '#F59E0B'; // Yellow
  }
  
  if (percentage >= 80) {
    return '#10B981'; // Green
  } else if (percentage >= 60) {
    return '#3B82F6'; // Blue
  } else if (percentage >= 40) {
    return '#F59E0B'; // Yellow
  } else {
    return '#EF4444'; // Red
  }
};

/**
 * Calculate statistics for data series
 */
export const calculateStats = (data: ChartData[], key: string) => {
  const values = data
    .map(item => item[key])
    .filter(value => typeof value === 'number') as number[];
  
  if (values.length === 0) {
    return { min: 0, max: 0, avg: 0, sum: 0 };
  }
  
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  return { min, max, avg, sum };
};

/**
 * Generate unique filename with timestamp
 */
export const generateFilename = (prefix: string = 'chart'): string => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${prefix}-${timestamp}`;
}; 