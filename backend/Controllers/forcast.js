// import  db from "../db.js";

// export const forecastItemDemand = async (req, res) => {
//     const { item_id } = req.params;
  
//     try {
//       // Step 1: Get the current stock of the item
//       const sqlStock = 'SELECT quantity FROM items WHERE item_id = ?';
//       const [item] = await db.query(sqlStock, [item_id]);
//       if (item.length === 0) {
//         return res.status(404).json({ message: 'Item not found.' });
//       }
  
//       const currentStock = item[0].quantity;
  
//       // Step 2: Analyze historical data of item demand
//       const sqlDemand = `
//         SELECT SUM(quantity) AS total_demand, 
//                COUNT(DISTINCT DATE(action_date)) AS days_used
//         FROM taken_items
//         WHERE item_id = ?
//         AND action_date >= CURDATE() - INTERVAL 30 DAY`; // Example: analyze the last 30 days
  
//       const [historicalData] = await db.query(sqlDemand, [item_id]);
      
//       if (historicalData.length === 0 || historicalData.total_demand === 0) {
//         return res.status(404).json({ message: 'No historical demand data found for this item.' });
//       }
  
//       // Calculate average daily demand over the last 30 days
//       const averageDailyDemand = historicalData.total_demand / historicalData.days_used;
  
//       // Step 3: Forecast future demand based on historical data
//       const forecastedDemand = Math.ceil(averageDailyDemand * 30); // Forecast for the next 30 days
  
//       // Optionally, apply a growth factor (e.g., 20% increase based on trends or seasonality)
//       const adjustedForecast = Math.ceil(forecastedDemand * 1.2); // 20% increase for future demand
  
//       res.status(200).json({
//         message: 'Forecast generated successfully.',
//         currentStock,
//         forecastedDemand: adjustedForecast,
//         predictedDemand: adjustedForecast,
//       });
//     } catch (error) {
//       console.error('Error generating forecast:', error);
//       res.status(500).json({ error: 'Failed to generate forecast.' });
//     }
//   };
  




// import db from '../config/db.js';
// import  MLR  from 'ml-regression';  // Import Linear Regression model from a library

// export const forecastItemDemand = async (req, res) => {
//     const { item_id } = req.params;
  
//     try {
//       // Step 1: Get the current stock of the item
//       const sqlStock = 'SELECT quantity FROM items WHERE item_id = ?';
//       const [item] = await db.query(sqlStock, [item_id]);
//       if (item.length === 0) {
//         return res.status(404).json({ message: 'Item not found.' });
//         console.log(item);
//       }
  
//       const currentStock = item[0].quantity;
  
//       // Step 2: Get historical data of item demand (e.g., daily usage over time)
//       const sqlDemand = `
//         SELECT DATE(action_date) AS date, SUM(quantity) AS daily_demand
//         FROM taken_items
//         WHERE item_id = ?
//         AND action_date >= CURDATE() - INTERVAL 90 DAY
//         GROUP BY DATE(action_date)
//         ORDER BY DATE(action_date) ASC;`;  // Example: last 90 days of demand data
  
//       const [historicalData] = await db.query(sqlDemand, [item_id]);
  
//       if (historicalData.length === 0) {
//         return res.status(404).json({ message: 'No historical demand data found for this item.' });
//       }
  
//       // Step 3: Prepare data for training the Linear Regression model
//       const dates = historicalData.map(record => (new Date(record.date)).getTime()); // Convert dates to timestamps
//       const dailyDemand = historicalData.map(record => record.daily_demand);
  
//       // Convert data to format for machine learning
//       const X = dates.map(date => [date]);  // Feature: date
//       const y = dailyDemand;               // Target: daily demand
  
//       // Step 4: Train Linear Regression Model
//       const regressionModel = new MLR(X, y);
  
//       // Step 5: Predict demand for the next day (e.g., Day after the last data point)
//       const lastDate = dates[dates.length - 1];
//       const nextDate = lastDate + 24 * 60 * 60 * 1000;  // Adding one day to the last date (next day prediction)
//       const predictedDemand = regressionModel.predict([nextDate]);
  
//       // Step 6: Forecast future demand (e.g., for the next 30 days)
//       const forecastedDemand = predictedDemand * 30; // Forecast for next 30 days
  
//       res.status(200).json({
//         message: 'Forecast generated successfully.',
//         currentStock,
//         forecastedDemand,
//         predictedDemand: predictedDemand,
//       });
  
//     } catch (error) {
//       console.error('Error generating forecast:', error);
//       res.status(500).json({ error: 'Failed to generate forecast.' });
//     }
// };

import db from '../config/db.js';
import MLR from 'ml-regression-multivariate-linear';  // Correct import for multivariate regression

export const forecastItemDemand = async (req, res) => {
    const { item_id } = req.params;

    try {
        // Step 1: Get the current stock of the item
        const sqlStock = 'SELECT quantity FROM items WHERE item_id = ?';
        const [item] = await db.query(sqlStock, [item_id]);

        if (!item || item.length === 0) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        const currentStock = Number(item[0].quantity);

        // Step 2: Get historical data of item demand (e.g., daily usage over time)
        const sqlDemand = `
            SELECT DATE(action_date) AS date, SUM(quantity) AS daily_demand
            FROM taken_items
            WHERE item_id = ?
            AND action_date >= CURDATE() - INTERVAL 90 DAY
            GROUP BY DATE(action_date)
            ORDER BY DATE(action_date) ASC;`;

        const [historicalData] = await db.query(sqlDemand, [item_id]);

        if (!historicalData || historicalData.length === 0) {
            return res.status(404).json({ message: 'No historical demand data found for this item.' });
        }

        // Step 3: Prepare data for training the Linear Regression model
        const dates = historicalData.map(record => (new Date(record.date)).getTime());
        const dailyDemand = historicalData.map(record => Number(record.daily_demand));

        // Ensure data is properly formatted
        const X = dates.map(date => [date]);  // 2D array (each date inside an array)
        const y = dailyDemand;                // 1D array (simple array of demand values)

        if (X.length === 0 || y.length === 0) {
            return res.status(400).json({ message: 'Insufficient data for forecasting.' });
        }

        // Step 4: Train Linear Regression Model
        const regressionModel = new MLR(X, [y]);  // y must be wrapped inside an array

        // Step 5: Predict demand for the next day
        const lastDate = dates[dates.length - 1];
        const nextDate = lastDate + (24 * 60 * 60 * 1000); // Next day timestamp
        const predictedDemand = regressionModel.predict([[nextDate]]);

        // Step 6: Forecast future demand (e.g., for the next 30 days)
        const forecastedDemand = predictedDemand[0][0] * 30; // Extract value from 2D array

        res.status(200).json({
            message: 'Forecast generated successfully.',
            currentStock,
            forecastedDemand: Math.round(forecastedDemand),  // Round for better readability
            predictedDemand: Math.round(predictedDemand[0][0]), // Extract and round predicted value
        });

    } catch (error) {
        console.error('Error generating forecast:', error);
        res.status(500).json({ error: 'Failed to generate forecast.' });
    }
};

