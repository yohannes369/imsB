import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ReportPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items/items"); // Adjust the API URL as needed
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to fetch items.");
      }
    };

    fetchItems();
  }, []);

  // Prepare data for the bar chart
  const barChartData = {
    labels: items.map((item) => item.item_name),
    datasets: [
      {
        label: "Quantity",
        data: items.map((item) => item.quantity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the pie chart
  const pieChartData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Status",
        data: [
          items.filter((item) => item.status === "Active").length,
          items.filter((item) => item.status === "Inactive").length,
        ],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: ["#4CAF50", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  // Export to PDF (Table Only)
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Report", 20, 10);
    doc.autoTable({
      head: [["Item ID", "Item Name", "Quantity", "Status"]],
      body: items.map((item) => [item.item_id, item.item_name, item.quantity, item.status]),
      theme: "grid",
    });
    doc.save("inventory_report.pdf");
  };

  // CSV Headers
  const csvHeaders = [
    { label: "Item ID", key: "item_id" },
    { label: "Item Name", key: "item_name" },
    { label: "Quantity", key: "quantity" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-teal-600 mb-4">Inventory Report</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <div className="h-56 w-full">
            <h3 className="text-lg font-semibold mb-2">Item Quantities</h3>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
          </div>

          {/* Pie Chart */}
          <div className="h-56 w-full">
            <h3 className="text-lg font-semibold mb-2">Item Status Distribution</h3>
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg border border-gray-300 mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Item ID</th>
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.item_id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{item.item_id}</td>
                  <td className="border border-gray-300 p-2">{item.item_name}</td>
                  <td className="border border-gray-300 p-2">{item.quantity}</td>
                  <td className="border border-gray-300 p-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export Options */}
        <div className="flex space-x-4">
          <button
            onClick={handleExportPDF}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 px-4 font-semibold"
          >
            Export to PDF
          </button>
          {items.length > 0 && (
            <CSVLink
              data={items}
              headers={csvHeaders}
              filename="inventory_report.csv"
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 px-4 font-semibold"
            >
              Export to CSV
            </CSVLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
