// src/ForecastItemDemand.js
import React, { useState } from 'react';
import axios from 'axios';

const ForecastItemDemand = () => {
  const [item_id, setItemId] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null); // Add error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/forcast/${item_id}`);
      setForecastData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Failed to fetch forecast data. Please try again.'); // Set error message
      console.error('Error fetching forecast data:', error);
    }
  }

  return (
    <div className="forecast-container">
      <h1>Item Demand Forecast</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemId">Enter Item ID: </label>
          <input
            type="text"
            id="itemId"
            value={item_id}
            onChange={(e) => setItemId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Forecast</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {forecastData && (
        <div className="forecast-results">
          <h2>Forecast Results</h2>
          <p><strong>Current Stock:</strong> {forecastData.currentStock}</p>
          <p><strong>Predicted Demand for Next Day:</strong> {forecastData.predictedDemand}</p>
          <p><strong>Forecasted Demand for Next 30 Days:</strong> {forecastData.forecastedDemand}</p>
        </div>
      )}
    </div>
  );
};

export default ForecastItemDemand;
