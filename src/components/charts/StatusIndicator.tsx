import React from 'react';
import type { EquipmentStatus } from '../../types';

interface StatusIndicatorProps {
  status: EquipmentStatus;
  lastUpdate?: string;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  lastUpdate, 
  className = '' 
}) => {
  const getStatusConfig = (status: EquipmentStatus) => {
    switch (status) {
      case 'online':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-800',
          bgColor: 'bg-green-100',
          icon: '●',
          label: 'Online'
        };
      case 'offline':
        return {
          color: 'bg-gray-500',
          textColor: 'text-gray-800',
          bgColor: 'bg-gray-100',
          icon: '●',
          label: 'Offline'
        };
      case 'error':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-800',
          bgColor: 'bg-red-100',
          icon: '●',
          label: 'Error'
        };
      case 'maintenance':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-800',
          bgColor: 'bg-yellow-100',
          icon: '●',
          label: 'Maintenance'
        };
      case 'warning':
        return {
          color: 'bg-orange-500',
          textColor: 'text-orange-800',
          bgColor: 'bg-orange-100',
          icon: '●',
          label: 'Warning'
        };
      default:
        return {
          color: 'bg-gray-500',
          textColor: 'text-gray-800',
          bgColor: 'bg-gray-100',
          icon: '●',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-2 px-3 py-1 rounded-full border">
        <span 
          className={`w-2 h-2 rounded-full ${config.color} animate-pulse`}
          aria-hidden="true"
        />
        <span className={`text-sm font-medium ${config.textColor}`}>
          {config.label}
        </span>
      </div>
      
      {lastUpdate && (
        <div className="text-xs text-gray-500">
          Last update: {new Date(lastUpdate).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default StatusIndicator; 