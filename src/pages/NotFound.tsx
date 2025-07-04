import React from 'react';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 className="text-5xl font-bold text-blue-800 mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist or has been moved.</p>
    <a href="/" className="text-blue-700 hover:underline">Return to Home</a>
  </div>
);

export default NotFound; 