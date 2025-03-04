// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Login"; // ✅ Ensure correct case
// import Admindashboard from "./components/admindashboard"; // ✅ Ensure correct case
// import Managerdashboard from "./components/Managerdashboard"; // ✅ Ensure correct case
// import "./assets/template_assets/css/bootstrap.css";
// import "./assets/template_assets/css/style.css";
// import "./assets/template_assets/css/responsive.css";
// import "./assets/template_assets/css/color.css";

// // Import the custom css file 
// import "./assets/styles/custom.css";

// // Import the Header component 
// // import Header from '../components/Header/Header.js';
// // Import the Footer component
// import Footer from './components/Footer/Footer';

// const App = () => {
//   const [role, setRole] = useState(null);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               !role ? (
//                 <Login setRole={setRole} />
//               ) : role === "admin" ? (
//                 <Admindashboard />
//               ) : (
//                 <Managerdashboard />
//               )
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Admindashboard from "./components/admindashboard"; // ✅ Ensure correct case
import Managerdashboard from "./components/Managerdashboard"; 
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css";

const App = () => {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              !role ? (
                <Login setRole={setRole} />
              ) : role === "admin" ? (
                <Admindashboard />
              ) : (
                <Managerdashboard />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;