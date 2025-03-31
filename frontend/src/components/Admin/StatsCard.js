import React from 'react';

const StatsCard = ({ title, value, gradient }) => (
  <div className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-lg shadow-lg`}>
    <h2 className="text-2xl font-bold">{title}</h2>
    <p className="text-4xl mt-2">{value}</p>
  </div>
);

export default StatsCard;
