import React, { useState } from 'react';
import type { EquipmentControl } from '../../types';

interface EquipmentControlsProps {
  controls: EquipmentControl[];
  onControlChange: (controlId: string, value: string | number | boolean) => Promise<boolean>;
  className?: string;
}

const EquipmentControls: React.FC<EquipmentControlsProps> = ({
  controls,
  onControlChange,
  className = ''
}) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [controlValues, setControlValues] = useState<Record<string, string | number | boolean>>(
    controls.reduce((acc, control) => ({ ...acc, [control.id]: control.value }), {})
  );

  const handleControlChange = async (controlId: string, value: string | number | boolean) => {
    setLoadingStates(prev => ({ ...prev, [controlId]: true }));
    
    try {
      const success = await onControlChange(controlId, value);
      if (success) {
        setControlValues(prev => ({ ...prev, [controlId]: value }));
      }
    } catch (error) {
      console.error('Control change failed:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [controlId]: false }));
    }
  };

  const renderControl = (control: EquipmentControl) => {
    const isLoading = loadingStates[control.id];
    const currentValue = controlValues[control.id];

    switch (control.type) {
      case 'button':
        return (
          <button
            onClick={() => handleControlChange(control.id, !(currentValue as boolean))}
            disabled={!control.enabled || isLoading}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              control.enabled && !isLoading
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label={control.description}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </span>
            ) : (
              control.name
            )}
          </button>
        );

      case 'toggle':
        return (
          <div className="flex items-center space-x-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={currentValue as boolean}
                onChange={(e) => handleControlChange(control.id, e.target.checked)}
                disabled={!control.enabled || isLoading}
                className="sr-only"
                aria-label={control.description}
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                currentValue as boolean ? 'bg-blue-600' : 'bg-gray-300'
              } ${!control.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  currentValue as boolean ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </div>
            </label>
            <span className="text-sm font-medium text-gray-700">{control.name}</span>
            {isLoading && (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        );

      case 'slider': {
        const sliderValue = typeof currentValue === 'number' ? currentValue : 0;
        const min = control.min ?? 0;
        const max = control.max ?? 100;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">{control.name}</label>
              <span className="text-sm text-gray-500">{sliderValue}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={control.step}
              value={sliderValue}
              onChange={(e) => setControlValues(prev => ({ ...prev, [control.id]: parseFloat(e.target.value) }))}
              onMouseUp={(e) => handleControlChange(control.id, parseFloat((e.target as HTMLInputElement).value))}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleControlChange(control.id, parseFloat((e.target as HTMLInputElement).value));
                }
              }}
              disabled={!control.enabled || isLoading}
              className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
                !control.enabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((sliderValue - min) / (max - min)) * 100}%, #E5E7EB ${((sliderValue - min) / (max - min)) * 100}%, #E5E7EB 100%)`
              }}
              aria-label={control.description}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{min}</span>
              <span>{max}</span>
            </div>
          </div>
        );
      }

      case 'input':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{control.name}</label>
            <input
              type="text"
              value={currentValue as string}
              onChange={(e) => setControlValues(prev => ({ ...prev, [control.id]: e.target.value }))}
              onBlur={() => handleControlChange(control.id, currentValue)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleControlChange(control.id, currentValue);
                }
              }}
              disabled={!control.enabled || isLoading}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !control.enabled ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder="Enter value..."
              aria-label={control.description}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (controls.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        <p>No controls available for this equipment</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800">Equipment Controls</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {controls.map((control) => (
          <div
            key={control.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="space-y-3">
              {renderControl(control)}
              <p className="text-xs text-gray-600 mt-2">{control.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
        <p className="font-medium mb-1">⚠️ Safety Notice:</p>
        <p>Equipment controls should only be used by authorized personnel. Some controls may affect system operation and safety.</p>
      </div>
    </div>
  );
};

export default EquipmentControls; 