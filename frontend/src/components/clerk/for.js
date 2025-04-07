// // src/ForecastItemDemand.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const ForecastItemDemand = () => {
//   const [item_id, setItemId] = useState('');
//   const [forecastData, setForecastData] = useState(null);
//   const [error, setError] = useState(null); // Add error state

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:5000/api/forcast/${item_id}`);
//       setForecastData(response.data);
//       setError(null); // Clear any previous errors
//     } catch (error) {
//       setError('Failed to fetch forecast data. Please try again.'); // Set error message
//       console.error('Error fetching forecast data:', error);
//     }
//   }

//   return (
//     <div className="forecast-container">
//       <h1>Item Demand Forecast</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="itemId">Enter Item ID: </label>
//           <input
//             type="text"
//             id="itemId"
//             value={item_id}
//             onChange={(e) => setItemId(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Generate Forecast</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {forecastData && (
//         <div className="forecast-results">
//           <h2>Forecast Results</h2>
//           <p><strong>Current Stock:</strong> {forecastData.currentStock}</p>
//           <p><strong>Predicted Demand for Next Day:</strong> {forecastData.predictedDemand}</p>
//           <p><strong>Forecasted Demand for Next 30 Days:</strong> {forecastData.forecastedDemand}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForecastItemDemand;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ForecastItemDemand = () => {
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [forecastData, setForecastData] = useState(null);
  const [staffUsageData, setStaffUsageData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds

  // Fetch all items from database with automatic refresh
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items');
        setItemsList(response.data);
        setError(null);
        
        // If an item was selected but no longer exists, clear selection
        if (itemId && !response.data.some(item => item.item_id === itemId)) {
          setItemId('');
          setItemName('');
        }
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items list. Retrying...');
      }
    };
    
    fetchItems(); // Initial fetch
    
    if (autoRefresh) {
      const interval = setInterval(fetchItems, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, itemId]);

  // Fetch forecast and usage data when item is selected
  useEffect(() => {
    if (!itemId) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch both forecast and usage data in parallel
        const [forecastResponse, usageResponse] = await Promise.all([
          axios.get(`/api/forecast/${itemId}`),
          axios.get(`/api/items/${itemId}/usage`)
        ]);
        
        setForecastData(forecastResponse.data);
        setStaffUsageData(usageResponse.data);
        
        // Set item name if available in response
        if (forecastResponse.data.itemName) {
          setItemName(forecastResponse.data.itemName);
        } else {
          // Fallback to find name from items list
          const item = itemsList.find(i => i.item_id === itemId);
          if (item) setItemName(item.name);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch forecast data. Retrying...');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData(); // Initial fetch
    
    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [itemId, autoRefresh, refreshInterval, itemsList]);

  // Prepare demand forecast chart data
  const getDemandChartData = () => {
    if (!forecastData) return null;

    // Generate labels for past 30 days and next 30 days
    const labels = [
      ...Array.from({ length: 30 }, (_, i) => `Day -${30 - i}`),
      'Today',
      ...Array.from({ length: 30 }, (_, i) => `Day +${i + 1}`)
    ];

    // Prepare data points (null for future/past if not available)
    const historicalData = [
      ...(forecastData.historicalUsage || []),
      ...Array(Math.max(0, 31 - (forecastData.historicalUsage?.length || 0))).fill(null)
    ].slice(-31); // Take last 31 days (30 past + today)

    return {
      labels,
      datasets: [
        {
          label: 'Historical Usage',
          data: historicalData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Forecasted Demand',
          data: forecastData.forecastedDemand,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4,
        },
        {
          label: 'Current Stock Level',
          data: Array(61).fill(forecastData.currentStock),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          borderWidth: 1,
          borderDash: [3, 3],
        }
      ]
    };
  };

  // Prepare staff usage chart data with department breakdown
  const getStaffUsageChartData = () => {
    if (!staffUsageData.length) return null;

    // Group by department if available
    const departments = [...new Set(staffUsageData.map(staff => staff.department || 'Other'))];
    
    if (departments.length > 1) {
      return {
        labels: departments,
        datasets: [
          {
            label: 'Quantity Taken by Department',
            data: departments.map(dept => 
              staffUsageData
                .filter(staff => (staff.department || 'Other') === dept)
                .reduce((sum, staff) => sum + staff.quantity, 0)
            ),
            backgroundColor: departments.map((_, i) => 
              `hsl(${(i * 360 / departments.length)}, 70%, 50%)`
            ),
            borderColor: departments.map((_, i) => 
              `hsl(${(i * 360 / departments.length)}, 70%, 40%)`
            ),
            borderWidth: 1,
          }
        ]
      };
    }

    // Default to individual staff if no departments
    return {
      labels: staffUsageData.map(staff => staff.staff_name || staff.staff_id),
      datasets: [
        {
          label: 'Quantity Taken',
          data: staffUsageData.map(staff => staff.quantity),
          backgroundColor: staffUsageData.map((_, i) => 
            `hsl(${(i * 360 / staffUsageData.length)}, 70%, 50%)`
          ),
          borderColor: staffUsageData.map((_, i) => 
            `hsl(${(i * 360 / staffUsageData.length)}, 70%, 40%)`
          ),
          borderWidth: 1,
        }
      ]
    };
  };

  // Chart options with enhanced tooltips
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} units`;
            }
            return label;
          },
          footer: (tooltipItems) => {
            if (tooltipItems[0].dataIndex === 30) { // Today
              return 'Current Day';
            }
            return '';
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const staffChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.parsed.y} units taken`;
          },
          afterLabel: (context) => {
            const staff = staffUsageData[context.dataIndex];
            if (!staff) return null;
            
            let info = [];
            if (staff.staff_id) info.push(`ID: ${staff.staff_id}`);
            if (staff.department) info.push(`Dept: ${staff.department}`);
            if (staff.last_taken) info.push(`Last: ${new Date(staff.last_taken).toLocaleDateString()}`);
            
            return info.join('\n');
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity Taken'
        }
      },
      x: {
        title: {
          display: true,
          text: staffUsageData[0]?.department ? 'Department' : 'Staff Member'
        }
      }
    }
  };

  // Calculate days until stockout
  const daysUntilStockout = forecastData && forecastData.predictedDemand > 0
    ? Math.floor(forecastData.currentStock / forecastData.predictedDemand)
    : Infinity;

  // Calculate reorder recommendation
  const getReorderRecommendation = () => {
    if (!forecastData) return '';
    
    const avgDailyDemand = forecastData.predictedDemand;
    const leadTimeDays = 7; // Average time to receive new stock
    const safetyStock = Math.ceil(avgDailyDemand * 1.5); // 1.5x daily demand as buffer
    
    const recommendedOrder = Math.max(0, 
      (avgDailyDemand * 30) - forecastData.currentStock + safetyStock
    );
    
    if (recommendedOrder <= 0) {
      return 'Current stock is sufficient for the next 30 days with safety buffer';
    }
    
    return `Recommended to order ${Math.ceil(recommendedOrder)} units to cover next 30 days (including ${safetyStock} units safety stock)`;
  };

  // Get top 5 staff members by usage
  const getTopStaff = () => {
    return [...staffUsageData]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Item Demand Forecasting</h1>
            <p className="text-gray-600">Real-time usage analysis and demand prediction</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center">
              <label htmlFor="autoRefresh" className="mr-2 text-sm text-gray-600">
                Auto-refresh
              </label>
              <input
                type="checkbox"
                id="autoRefresh"
                checked={autoRefresh}
                onChange={() => setAutoRefresh(!autoRefresh)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="15">Every 15s</option>
              <option value="30">Every 30s</option>
              <option value="60">Every 1m</option>
              <option value="300">Every 5m</option>
            </select>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label htmlFor="itemId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Item to Analyze
              </label>
              <select
                id="itemId"
                value={itemId}
                onChange={(e) => {
                  setItemId(e.target.value);
                  const selectedItem = itemsList.find(item => item.item_id === e.target.value);
                  setItemName(selectedItem ? selectedItem.name : '');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select an item...</option>
                {itemsList.map(item => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.name} (ID: {item.item_id}) - Current: {item.quantity} units
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                if (itemId) {
                  setForecastData(null);
                  setStaffUsageData([]);
                }
              }}
              disabled={!itemId || isLoading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                !itemId || isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Refresh Data
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex items-start">
            <svg className="flex-shrink-0 h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-medium">Error</h3>
              <p>{error}</p>
              <p className="mt-1">The system will automatically retry...</p>
            </div>
          </div>
        )}
      </div>

      {forecastData && (
        <div className="space-y-6">
          {/* Item Header */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{itemName}</h2>
                <p className="text-gray-600">Item ID: {itemId}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date(forecastData.lastUpdated).toLocaleTimeString()}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    autoRefresh ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-sm font-medium text-gray-500">Current Stock</h3>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{forecastData.currentStock} units</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-sm font-medium text-gray-500">Avg Daily Usage</h3>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {forecastData.predictedDemand} units/day
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-sm font-medium text-gray-500">Days Until Stockout</h3>
              </div>
              <p className={`mt-2 text-2xl font-semibold ${
                daysUntilStockout < 7 ? 'text-red-600' : 
                daysUntilStockout < 14 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {daysUntilStockout === Infinity ? '∞' : daysUntilStockout} days
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-sm font-medium text-gray-500">Stock Status</h3>
              </div>
              <p className="mt-2 text-xl font-semibold text-gray-900">
                {daysUntilStockout < 7 ? 'Urgent Reorder' : 
                 daysUntilStockout < 14 ? 'Monitor Closely' : 'Stock Healthy'}
              </p>
            </div>
          </div>

          {/* Demand Forecast Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Demand Forecast Trend</h2>
              <div className="mt-2 md:mt-0 text-sm text-gray-500">
                Showing {forecastData.historicalUsage?.length || 0} days history and {forecastData.forecastedDemand?.length || 0} days forecast
              </div>
            </div>
            <div className="h-96">
              {getDemandChartData() && (
                <Line data={getDemandChartData()} options={chartOptions} />
              )}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>The forecast is based on historical usage patterns and may vary based on seasonal factors.</p>
              {forecastData.forecastAccuracy && (
                <p>Model accuracy: {forecastData.forecastAccuracy}% (based on historical predictions)</p>
              )}
            </div>
          </div>

          {/* Staff Usage Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {staffUsageData[0]?.department ? 'Department Usage' : 'Staff Usage'}
                </h2>
                <span className="text-sm text-gray-500">
                  {staffUsageData.length} {staffUsageData[0]?.department ? 'departments' : 'staff members'}
                </span>
              </div>
              <div className="h-80">
                {getStaffUsageChartData() && (
                  <Bar data={getStaffUsageChartData()} options={staffChartOptions} />
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Usage Insights</h2>
              <div className="space-y-6">
                {/* Top Staff/Departments */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Top {staffUsageData[0]?.department ? 'Departments' : 'Staff'}
                  </h3>
                  <div className="mt-2 space-y-2">
                    {getTopStaff().map((staff, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {staff.staff_name || staff.staff_id || staff.department}
                          </p>
                          {staff.department && staff.staff_name && (
                            <p className="text-xs text-gray-500">{staff.department}</p>
                          )}
                        </div>
                        <div className="text-lg font-semibold text-indigo-600">
                          {staff.quantity} units
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Usage Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Usage</h3>
                    <p className="mt-1 text-xl font-medium text-gray-900">
                      {staffUsageData.reduce((sum, staff) => sum + staff.quantity, 0)} units
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Avg Usage</h3>
                    <p className="mt-1 text-xl font-medium text-gray-900">
  {staffUsageData.length > 0 
    ? (staffUsageData.reduce((sum, staff) => sum + staff.quantity, 0) / staffUsageData.length).toFixed(1)
    : 0
  } units
</p>
                  </div>
                </div>
                
                {/* Recommendation */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Inventory Recommendation
                  </h3>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
  <p className="text-blue-800 font-medium">{getReorderRecommendation()}</p>
  {daysUntilStockout < 14 && (
    <p className="mt-1 text-sm text-blue-700">
      Suggested reorder date: {new Date(Date.now() + (Math.max(0, daysUntilStockout - 3) * 24 * 60 * 60 * 1000)).toLocaleDateString()}
    </p>
  )}
</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Forecast Table */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed 30-Day Forecast</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Demand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projected Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forecastData.forecastedDates.slice(0, 30).map((date, index) => {
                    const projectedStock = Math.max(0, forecastData.currentStock - 
                      (forecastData.forecastedDemand.slice(0, index + 1).reduce((a, b) => a + b, 0))
                    );
                    
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Day +{index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {forecastData.forecastedDemand[index]} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {projectedStock} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {projectedStock <= 0 ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Out of Stock
                            </span>
                          ) : projectedStock < (forecastData.predictedDemand * 3) ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              In Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!forecastData && !isLoading && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No item selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select an item from the dropdown to view its demand forecast and usage patterns.</p>
        </div>
      )}

      {isLoading && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Analyzing item data</h3>
          <p className="mt-1 text-sm text-gray-500">We're crunching the numbers to predict future demand...</p>
        </div>
      )}
    </div>
  );
};

export default ForecastItemDemand;