import React, { useState, useEffect, useRef } from "react";
import Barcode from "react-barcode";
import axios from "axios";
import { FaPrint, FaSync } from "react-icons/fa";

const BarcodeGenerator = () => {
  const [items, setItems] = useState([]);
  const printRef = useRef();

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items/getItem");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Print Barcode Section
  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write(
      `<html><head><title>Print Barcodes</title><link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"></head><body class='p-4'>`
    );
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Generated Barcodes</h2>
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <div ref={printRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {items.map((item) => (
            <div key={item.Item_Code} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm font-semibold text-gray-600 mb-2">{item.Item_Name}</p>
              <Barcode value={item.Item_Code} height={50} width={1.5} displayValue={false} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handlePrint}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <FaPrint className="mr-2" /> Print Barcodes
        </button>
        <button
          onClick={fetchItems}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <FaSync className="mr-2" /> Refresh List
        </button>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
