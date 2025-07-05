import React, { useState } from 'react';

interface EquipmentPhotoProps {
  photoPath: string;
  alt: string;
  className?: string;
}

const EquipmentPhoto: React.FC<EquipmentPhotoProps> = ({
  photoPath,
  alt,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Convert relative path to actual image path
  const getImagePath = (path: string) => {
    if (path.startsWith('/src/')) {
      // Remove /src/ prefix and use dynamic import
      const cleanPath = path.replace('/src/', '');
      return new URL(`../../assets/${cleanPath.split('/').pop()}`, import.meta.url).href;
    }
    return path;
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center p-8">
          <div className="text-gray-400 text-6xl mb-4">📷</div>
          <p className="text-gray-600 text-sm">Image not available</p>
          <p className="text-gray-500 text-xs mt-1">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
      
      <img
        src={getImagePath(photoPath)}
        alt={alt}
        className={`w-full h-auto object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
      
      {/* Image overlay with equipment info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p className="text-white text-sm font-medium">{alt}</p>
      </div>
    </div>
  );
};

export default EquipmentPhoto; 