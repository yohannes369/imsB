import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const C = () => {
  const { item_id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch item details first
        const itemRes = await fetch(`/api/items/${item_id}`);
        const item = await itemRes.json();
        setItemDetails(item);
        
        // Then fetch forecast data
        const forecastRes = await fetch(`/api/forecast/${item_id}`);
        const data = await forecastRes.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setItemData(data);
        
        // Fetch historical data for chart
        const historyRes = await fetch(`/api/items/${item_id}/history`);
        const historyData = await historyRes.json();
        setHistoricalData(historyData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [item_id]);

  if (loading) return <div className="text-center py-8">Loading forecast data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!itemData) return <div className="text-center py-8">No data available</div>;

  // Prepare chart data
  const chartData = {
    datasets: [
      {
        label: 'Daily Demand',
        data: historicalData.map(item => ({
          x: new Date(item.date),
          y: item.daily_demand
        })),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM d, yyyy',
          displayFormats: {
            day: 'MMM d'
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Quantity Used'
        },
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            return new Date(context[0].raw.x).toLocaleDateString();
          }
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Demand Forecast for {itemDetails.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="space-y-4">
            <p><span className="font-medium">Item ID:</span> {item_id}</p>
            <p><span className="font-medium">Current Stock:</span> {itemData.currentStock} units</p>
            <p><span className="font-medium">Predicted Daily Demand:</span> {itemData.predictedDemand} units/day</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">30-Day Forecast</h2>
          <div className="space-y-4">
            <p>
              <span className="font-medium">Projected Demand:</span> {itemData.forecastedDemand} units
            </p>
            <p>
              <span className="font-medium">Days Until Stockout:</span> 
              {Math.floor(itemData.currentStock / itemData.predictedDemand)} days
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{
                  width: `${Math.min(100, (itemData.currentStock / itemData.forecastedDemand) * 100)}%`
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Current stock covers {((itemData.currentStock / itemData.forecastedDemand) * 100).toFixed(1)}% of projected 30-day demand
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Historical Demand Pattern</h2>
        <div className="h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        {itemData.currentStock / itemData.predictedDemand < 30 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Warning:</span> Current stock may not cover projected 30-day demand. 
                  Consider replenishing inventory soon.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <span className="font-medium">Good:</span> Current stock is sufficient to cover projected 30-day demand.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default C;