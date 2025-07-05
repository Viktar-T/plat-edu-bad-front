import React, { useState } from 'react';
import type { EquipmentSpecification, TechnicalSpecification } from '../../types';

interface EquipmentSpecsProps {
  specifications: EquipmentSpecification[];
  technicalSpecs: TechnicalSpecification[];
  className?: string;
}

const EquipmentSpecs: React.FC<EquipmentSpecsProps> = ({
  specifications,
  technicalSpecs,
  className = ''
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Group specifications by category
  const groupedSpecs = specifications.reduce((acc, spec) => {
    const category = spec.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(spec);
    return acc;
  }, {} as Record<string, EquipmentSpecification[]>);

  // Separate basic and advanced technical specs
  const basicTechSpecs = technicalSpecs.filter(spec => !spec.isAdvanced);
  const advancedTechSpecs = technicalSpecs.filter(spec => spec.isAdvanced);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Basic Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedSpecs).map(([category, specs]) => (
            <div key={category} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-800 mb-3">{category}</h4>
              <div className="space-y-2">
                {specs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-600">{spec.name}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {spec.value}
                      {spec.unit && <span className="text-gray-500 ml-1">{spec.unit}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Details</h3>
        
        {/* Basic Technical Specs */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-4">
          <h4 className="font-medium text-gray-800 mb-4">Basic Technical Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicTechSpecs.map((spec, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-700">{spec.name}</span>
                  <span className="text-sm text-gray-800 ml-2">
                    {spec.value}
                    {spec.unit && <span className="text-gray-500 ml-1">{spec.unit}</span>}
                  </span>
                </div>
                {spec.description && (
                  <p className="text-xs text-gray-600">{spec.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Technical Specs */}
        {advancedTechSpecs.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800">Advanced Technical Information</h4>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-expanded={showAdvanced}
                aria-controls="advanced-specs"
              >
                {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
              </button>
            </div>
            
            {showAdvanced && (
              <div id="advanced-specs" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {advancedTechSpecs.map((spec, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-700">{spec.name}</span>
                        <span className="text-sm text-gray-800 ml-2">
                          {spec.value}
                          {spec.unit && <span className="text-gray-500 ml-1">{spec.unit}</span>}
                        </span>
                      </div>
                      {spec.description && (
                        <p className="text-xs text-gray-600">{spec.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Equipment Information */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Equipment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">This equipment is part of our integrated renewable energy laboratory system.</p>
          </div>
          <div>
            <p className="text-gray-600">For detailed technical documentation and maintenance procedures, please contact the laboratory administrator.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentSpecs; 