import React from 'react';
import eduBadPlat from '../../assets/edu-bad-plat.png';

const Home: React.FC = () => (
  <div className="flex flex-col items-center justify-between min-h-screen">
    <div>Home Page (Page-0)</div>
    <img
      src={eduBadPlat}
      alt="Educational Platform Diagram"
      className="mt-8 mb-4 max-w-full h-auto"
      style={{ maxHeight: '200px' }}
    />
  </div>
);

export default Home; 