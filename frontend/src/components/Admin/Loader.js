import React from "react";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div className="loading-spinner"></div>

      <style>
        {`
          .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 5s linear infinite, fadeIn 1.5s ease-in-out;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
