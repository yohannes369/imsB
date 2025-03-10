import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif"; // Your loader image
import "./Loader.css";

const Loader = () => {
  const [progress, setProgress] = useState(0); // Start from 0%

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.67; // Increments every second to reach 100% in 60s
      });
    }, 1000); // 1 second interval

    return () => clearInterval(interval);
  }, []);

  const loaderElement = document.getElementById("loader");

  const loaderContent = (
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="Loading..." />
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>Loading... {Math.round(progress)}%</p>
      </div>
    </div>
  );

  return loaderElement ? ReactDOM.createPortal(loaderContent, loaderElement) : loaderContent;
};

export default Loader;
