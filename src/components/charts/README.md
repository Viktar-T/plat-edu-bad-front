# Chart Components Documentation

This document provides comprehensive documentation for the chart components library used in the Educational and Research Platform for Renewable Energy Monitoring.

## Overview

The chart library consists of reusable React components built with Recharts and TypeScript, designed specifically for educational and research purposes in renewable energy monitoring. All components are fully responsive, accessible, and support export functionality.

## Components

### 1. ChartWrapper

A base wrapper component that provides common functionality for all charts:
- Loading states
- Error handling
- Export options (PNG, SVG, CSV)
- Accessibility features
- Consistent styling

**Props:**
```typescript
interface ChartWrapperProps extends BaseChartProps {
  children: React.ReactNode;
  exportOptions?: ChartExportOptions;
}
```

### 2. LineChart

Displays time-series data as lines. Supports multiple data series, area charts, and customizable styling.

**Props:**
```typescript
interface LineChartProps extends BaseChartProps {
  dataKeys: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showArea?: boolean;
  showDots?: boolean;
  units?: Record<string, string>;
  tooltipFormatter?: (value: any, name: string) => string;
}
```

**Usage Example:**
```tsx
<LineChart
  title="Power Output Over Time"
  subtitle="Real-time power generation"
  data={timeSeriesData}
  dataKeys={['power', 'voltage']}
  xAxisLabel="Time"
  yAxisLabel="Power (W)"
  units={{ power: 'W', voltage: 'V' }}
  height={300}
  showExport={true}
  exportOptions={{
    exportAsPng: true,
    exportAsSvg: true,
    exportAsCsv: true
  }}
/>
```

### 3. BarChart

Displays comparative data as bars. Supports multiple data series, stacked bars, and categorical data.

**Props:**
```typescript
interface BarChartProps extends BaseChartProps {
  xKey: string;
  dataKeys: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  stacked?: boolean;
  units?: Record<string, string>;
  tooltipFormatter?: (value: any, name: string) => string;
}
```

**Usage Example:**
```tsx
<BarChart
  title="Energy Source Comparison"
  data={categoricalData}
  xKey="category"
  dataKeys={['power', 'efficiency']}
  xAxisLabel="Energy Source"
  yAxisLabel="Value"
  units={{ power: 'W', efficiency: '%' }}
  stacked={false}
  height={300}
  showExport={true}
/>
```

### 4. PieChart

Displays proportional data as pie or donut charts. Supports percentage labels and custom styling.

**Props:**
```typescript
interface PieChartProps extends BaseChartProps {
  dataKey: string;
  nameKey: string;
  showPercentage?: boolean;
  showValue?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  tooltipFormatter?: (value: any, name: string) => string;
}
```

**Usage Example:**
```tsx
<PieChart
  title="Energy Source Distribution"
  data={proportionalData}
  dataKey="percentage"
  nameKey="source"
  showPercentage={true}
  showValue={false}
  innerRadius={0} // 0 for pie chart, >0 for donut
  outerRadius={80}
  height={300}
  showExport={true}
/>
```

### 5. AreaChart

Displays power generation/accumulation over time. Supports stacked areas and multiple data series.

**Props:**
```typescript
interface AreaChartProps extends BaseChartProps {
  dataKeys: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  stacked?: boolean;
  units?: Record<string, string>;
  tooltipFormatter?: (value: any, name: string) => string;
}
```

**Usage Example:**
```tsx
<AreaChart
  title="Power Generation Accumulation"
  data={timeSeriesData}
  dataKeys={['power', 'efficiency']}
  xAxisLabel="Time"
  yAxisLabel="Power (W)"
  units={{ power: 'W', efficiency: '%' }}
  stacked={true}
  height={300}
  showExport={true}
/>
```

### 6. GaugeChart

Displays real-time readings with customizable thresholds and color ranges.

**Props:**
```typescript
interface GaugeChartProps extends BaseChartProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  warningThreshold?: number;
  criticalThreshold?: number;
  size?: number;
  colorRanges?: {
    min: number;
    max: number;
    color: string;
  }[];
}
```

**Usage Example:**
```tsx
<GaugeChart
  title="Battery State of Charge"
  data={data}
  value={75}
  min={0}
  max={100}
  unit="%"
  warningThreshold={20}
  criticalThreshold={10}
  size={200}
  height={300}
  showExport={true}
/>
```

### 7. MultiAxisChart

Displays complex relationships with multiple Y-axes for different data types and scales.

**Props:**
```typescript
interface MultiAxisChartProps extends BaseChartProps {
  primaryDataKeys: string[];
  secondaryDataKeys?: string[];
  xAxisLabel?: string;
  primaryYAxisLabel?: string;
  secondaryYAxisLabel?: string;
  units?: Record<string, string>;
  tooltipFormatter?: (value: any, name: string) => string;
}
```

**Usage Example:**
```tsx
<MultiAxisChart
  title="Temperature vs Power Output"
  data={timeSeriesData}
  primaryDataKeys={['temperature']}
  secondaryDataKeys={['power']}
  xAxisLabel="Time"
  primaryYAxisLabel="Temperature (°C)"
  secondaryYAxisLabel="Power (W)"
  units={{ temperature: '°C', power: 'W' }}
  height={400}
  showExport={true}
/>
```

## Common Props

All chart components extend `BaseChartProps`:

```typescript
interface BaseChartProps {
  title: string;
  subtitle?: string;
  data: ChartData[];
  height?: number;
  loading?: boolean;
  error?: string;
  className?: string;
  showExport?: boolean;
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  ariaLabel?: string;
}
```

## Data Format

All charts expect data in the following format:

```typescript
interface ChartData {
  [key: string]: number | string;
}
```

For time-series charts, include a `timestamp` field:
```typescript
{
  timestamp: "2024-01-01T12:00:00Z",
  power: 850,
  voltage: 230,
  temperature: 25
}
```

## Export Options

All charts support export functionality through the `exportOptions` prop:

```typescript
interface ChartExportOptions {
  exportAsPng?: boolean;
  exportAsSvg?: boolean;
  exportAsCsv?: boolean;
  filenamePrefix?: string;
}
```

## Accessibility Features

All chart components include:
- ARIA labels and roles
- Screen reader support
- Keyboard navigation
- High contrast support
- Alt text for exported images

## Color Schemes

Default color palette optimized for educational interfaces:
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Secondary: Purple (#8B5CF6)

## Best Practices

1. **Data Validation**: Always validate data before passing to charts
2. **Loading States**: Use loading props for async data
3. **Error Handling**: Provide meaningful error messages
4. **Responsive Design**: Charts automatically adapt to container size
5. **Accessibility**: Always provide ariaLabel for screen readers
6. **Export Options**: Enable export for educational presentations
7. **Performance**: Use React.memo for charts with static data

## Performance Optimization

- Use `React.memo` for charts with static data
- Implement proper data filtering before rendering
- Use `useMemo` for expensive calculations
- Avoid unnecessary re-renders with proper dependency arrays

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- React 18+
- Recharts 2.0+
- TypeScript 4.5+
- Tailwind CSS 3.0+

## Examples

See the `/charts-demo` page for comprehensive examples of all chart types with sample data and usage patterns.

## Troubleshooting

### Common Issues

1. **Charts not rendering**: Check data format and ensure data array is not empty
2. **Export not working**: Ensure html2canvas is installed for PNG export
3. **Responsive issues**: Wrap charts in ResponsiveContainer or use ChartWrapper
4. **TypeScript errors**: Ensure proper type definitions for custom data

### Performance Issues

1. **Slow rendering**: Reduce data points or use data sampling
2. **Memory leaks**: Clean up intervals and event listeners
3. **Large datasets**: Implement pagination or virtual scrolling

## Contributing

When adding new chart types:
1. Follow the existing component structure
2. Include proper TypeScript interfaces
3. Add accessibility features
4. Include export functionality
5. Update documentation
6. Add examples to the demo page 