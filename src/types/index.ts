// Barrel export for types
export {};

/**
 * Represents a laboratory equipment item.
 */
export interface Equipment {
  /** Unique identifier for the equipment */
  id: string;
  /** Human-readable name of the equipment */
  name: string;
  /** Type/category of the equipment (e.g., inverter, battery, sensor) */
  type: string;
  /** Physical or logical location of the equipment */
  location: string;
  /** Current operational status (e.g., 'online', 'offline', 'error', 'maintenance') */
  status: EquipmentStatus;
  /** Real-time or latest sensor data for the equipment */
  data: EquipmentData;
  /** Optional description or notes */
  description?: string;
}

/**
 * Detailed equipment information for the Equipment Detail Page
 */
export interface EquipmentDetail extends Equipment {
  /** Full description of the equipment */
  description: string;
  /** Main equipment photo path */
  photoPath: string;
  /** Equipment specifications */
  specifications: EquipmentSpecification[];
  /** Technical specifications */
  technicalSpecs: TechnicalSpecification[];
  /** Control capabilities */
  controls?: EquipmentControl[];
  /** Related equipment IDs */
  relatedEquipment?: string[];
  /** Installation date */
  installationDate: string;
  /** Manufacturer information */
  manufacturer: string;
  /** Model number */
  model: string;
  /** Serial number */
  serialNumber: string;
}

/**
 * Equipment specification item
 */
export interface EquipmentSpecification {
  /** Specification name */
  name: string;
  /** Specification value */
  value: string | number;
  /** Unit of measurement */
  unit?: string;
  /** Category for grouping */
  category?: string;
}

/**
 * Technical specification with expandable details
 */
export interface TechnicalSpecification {
  /** Specification name */
  name: string;
  /** Specification value */
  value: string | number;
  /** Unit of measurement */
  unit?: string;
  /** Detailed description */
  description?: string;
  /** Whether this is an advanced/technical spec */
  isAdvanced?: boolean;
}

/**
 * Equipment control interface
 */
export interface EquipmentControl {
  /** Control ID */
  id: string;
  /** Control name */
  name: string;
  /** Control type */
  type: 'button' | 'toggle' | 'slider' | 'input';
  /** Current value */
  value: any;
  /** Available options for select/toggle controls */
  options?: { label: string; value: any }[];
  /** Min/max values for slider controls */
  min?: number;
  max?: number;
  /** Step value for slider controls */
  step?: number;
  /** Whether the control is enabled */
  enabled: boolean;
  /** Description of what the control does */
  description: string;
}

/**
 * Enum for equipment operational status.
 */
export type EquipmentStatus = 'online' | 'offline' | 'error' | 'maintenance' | 'warning';

/**
 * Represents real-time sensor data for a piece of equipment.
 */
export interface EquipmentData {
  /** Timestamp of the data reading (ISO 8601 string) */
  timestamp: string;
  /** Key-value pairs for sensor readings (e.g., voltage, current, temperature) */
  [key: string]: number | string;
}

/**
 * Historical data for charts
 */
export interface HistoricalData {
  /** Data point timestamp */
  timestamp: string;
  /** Voltage reading */
  voltage?: number;
  /** Current reading */
  current?: number;
  /** Power reading */
  power?: number;
  /** Temperature reading */
  temperature?: number;
  /** Efficiency percentage */
  efficiency?: number;
  /** Status indicator */
  status?: string;
}

/**
 * Chart configuration for equipment data visualization
 */
export interface ChartConfig {
  /** Chart title */
  title: string;
  /** Chart type */
  type: ChartType;
  /** Data key to display */
  dataKey: string;
  /** Y-axis label */
  yAxisLabel: string;
  /** Color for the chart */
  color: string;
  /** Unit of measurement */
  unit: string;
}

/**
 * Base chart props interface
 */
export interface BaseChartProps {
  /** Chart title */
  title: string;
  /** Chart subtitle or description */
  subtitle?: string;
  /** Data to display */
  data: ChartData[];
  /** Chart height in pixels */
  height?: number;
  /** Whether to show loading state */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Custom CSS class */
  className?: string;
  /** Whether to show export options */
  showExport?: boolean;
  /** Custom colors for the chart */
  colors?: string[];
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Whether to show legend */
  showLegend?: boolean;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * Represents chart data for visualization
 */
export interface ChartData {
  /** X-axis value (e.g., timestamp, category) - optional for flexibility */
  x?: string | number;
  /** Y-axis value(s) (e.g., measurement, value) */
  [key: string]: number | string | undefined;
}

/**
 * Line chart specific props
 */
export interface LineChartProps extends BaseChartProps {
  /** Data keys to display as lines */
  dataKeys: string[];
  /** X-axis label */
  xAxisLabel?: string;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Whether to show area under the line */
  showArea?: boolean;
  /** Whether to show dots on the line */
  showDots?: boolean;
  /** Units for each data key */
  units?: Record<string, string>;
  /** Custom tooltip formatter */
  tooltipFormatter?: (value: any, name: string) => string;
  /** Export options */
  exportOptions?: ChartExportOptions;
}

/**
 * Bar chart specific props
 */
export interface BarChartProps extends BaseChartProps {
  /** Data key for X-axis */
  xKey: string;
  /** Data keys to display as bars */
  dataKeys: string[];
  /** X-axis label */
  xAxisLabel?: string;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Whether to stack bars */
  stacked?: boolean;
  /** Units for each data key */
  units?: Record<string, string>;
  /** Custom tooltip formatter */
  tooltipFormatter?: (value: any, name: string) => string;
  /** Export options */
  exportOptions?: ChartExportOptions;
}

/**
 * Pie chart specific props
 */
export interface PieChartProps extends BaseChartProps {
  /** Data key for values */
  dataKey: string;
  /** Data key for labels */
  nameKey: string;
  /** Whether to show percentage labels */
  showPercentage?: boolean;
  /** Whether to show value labels */
  showValue?: boolean;
  /** Inner radius for donut chart (0-1) */
  innerRadius?: number;
  /** Outer radius (0-1) */
  outerRadius?: number;
  /** Custom tooltip formatter */
  tooltipFormatter?: (value: any, name: string) => string;
  /** Export options */
  exportOptions?: ChartExportOptions;
}

/**
 * Area chart specific props
 */
export interface AreaChartProps extends BaseChartProps {
  /** Data keys to display as areas */
  dataKeys: string[];
  /** X-axis label */
  xAxisLabel?: string;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Whether to stack areas */
  stacked?: boolean;
  /** Units for each data key */
  units?: Record<string, string>;
  /** Custom tooltip formatter */
  tooltipFormatter?: (value: any, name: string) => string;
  /** Export options */
  exportOptions?: ChartExportOptions;
}

/**
 * Gauge chart specific props
 */
export interface GaugeChartProps extends BaseChartProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Unit of measurement */
  unit: string;
  /** Warning threshold */
  warningThreshold?: number;
  /** Critical threshold */
  criticalThreshold?: number;
  /** Gauge size */
  size?: number;
  /** Custom color ranges */
  colorRanges?: {
    min: number;
    max: number;
    color: string;
  }[];
  /** Export options */
  exportOptions?: ChartExportOptions;
}

/**
 * Multi-axis chart specific props
 */
export interface MultiAxisChartProps extends BaseChartProps {
  /** Data keys for primary Y-axis */
  primaryDataKeys: string[];
  /** Data keys for secondary Y-axis */
  secondaryDataKeys?: string[];
  /** X-axis label */
  xAxisLabel?: string;
  /** Primary Y-axis label */
  primaryYAxisLabel?: string;
  /** Secondary Y-axis label */
  secondaryYAxisLabel?: string;
  /** Units for each data key */
  units?: Record<string, string>;
  /** Custom tooltip formatter */
  tooltipFormatter?: (value: any, name: string) => string;
  /** Export options */
  exportOptions?: ChartExportOptions;
}

/**
 * Export options for charts
 */
export interface ChartExportOptions {
  /** Export as PNG image */
  exportAsPng?: boolean;
  /** Export as SVG image */
  exportAsSvg?: boolean;
  /** Export as CSV data */
  exportAsCsv?: boolean;
  /** Custom filename prefix */
  filenamePrefix?: string;
}

/**
 * Chart theme configuration
 */
export interface ChartTheme {
  /** Primary color */
  primary: string;
  /** Secondary color */
  secondary: string;
  /** Success color */
  success: string;
  /** Warning color */
  warning: string;
  /** Error color */
  error: string;
  /** Background color */
  background: string;
  /** Text color */
  text: string;
  /** Grid color */
  grid: string;
  /** Border color */
  border: string;
}

/**
 * Represents a page route in the application.
 */
export interface PageRoute {
  /** Unique route path (e.g., '/dashboard', '/equipment/:id') */
  path: string;
  /** Display name for navigation */
  name: string;
  /** Optional icon for navigation menus */
  icon?: React.ReactNode;
  /** Optional flag for protected/authenticated routes */
  protected?: boolean;
}

/**
 * Represents a navigation item for the sidebar or menu.
 */
export interface NavigationItem {
  /** Display label */
  label: string;
  /** Route path to navigate to */
  to: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional children for nested navigation */
  children?: NavigationItem[];
}

/**
 * Represents a dashboard widget or card for data visualization.
 */
export interface DashboardWidget {
  /** Unique identifier for the widget */
  id: string;
  /** Title of the widget */
  title: string;
  /** Type of visualization (e.g., 'line', 'bar', 'pie', 'gauge') */
  type: ChartType;
  /** Data to be visualized */
  data: ChartData[];
  /** Optional description or tooltip */
  description?: string;
}

/**
 * Supported chart types for Recharts integration.
 */
export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'scatter' | 'gauge';

/**
 * Generic API response type for REST endpoints.
 */
export interface ApiResponse<T = any> {
  /** Indicates if the request was successful */
  success: boolean;
  /** Data payload (generic) */
  data: T;
  /** Optional error message */
  error?: string;
  /** Optional status code */
  statusCode?: number;
}

/**
 * API response for paginated lists.
 */
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  /** Current page number */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
} 