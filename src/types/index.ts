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
 * Enum for equipment operational status.
 */
export type EquipmentStatus = 'online' | 'offline' | 'error' | 'maintenance';

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
 * Represents a single data point for charting (Recharts compatible).
 */
export interface ChartData {
  /** X-axis value (e.g., timestamp, category) */
  x: string | number;
  /** Y-axis value(s) (e.g., measurement, value) */
  [key: string]: number | string;
}

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