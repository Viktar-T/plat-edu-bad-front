import React from 'react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center min-h-[20vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-700 border-opacity-50"></div>
    <span className="ml-4 text-blue-800 font-medium">Loading...</span>
  </div>
);

export default Loading; 