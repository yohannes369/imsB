// import React from "react";
// import { FiBell } from "react-icons/fi";
// import Logout from "../logout/Logout";

// const Sidebar = ({
//   sidebarOpen,
//   setSidebarOpen,
//   departmentProfile,
//   notifications,
//   onLogout,
//   setShowEditModal,
// }) => {
//   return (
//     <div
//       className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col transform ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
//     >
//       {/* Main Sidebar Content */}
//       <div className="flex flex-col items-center p-6 h-full">
//         {/* Profile Photo Section */}
//         <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md mb-8">
//           {/* Rotating Green Ring */}
//           <div className="absolute inset-0 w-full h-full rounded-full border-4 border-green-950 animate-spin-slow"></div>
//           {/* Profile Photo */}
//           <img
//             src={departmentProfile.profilePhoto}
//             alt="Department Profile"
//             className="w-full h-full object-cover rounded-full"
//           />
//         </div>

//         <h2 className="text-xl font-bold text-green-950 mt-4">
//           {departmentProfile.name}
//         </h2>
//         <button
//           onClick={() => setShowEditModal(true)}
//           className="text-sm text-teal-600 hover:text-teal-800 mt-2 underline"
//           aria-label="Edit Profile"
//         >
//           Edit Profile
//         </button>

//         {/* Notifications */}
//         <div className="mb-6 w-full">
//           <h3 className="text-lg font-semibold text-green-950 mb-2">
//             Notifications
//           </h3>
//           <ul className="space-y-2">
//             {notifications.map((notification, index) => (
//               <li
//                 key={index}
//                 className="flex items-center text-green-950 text-sm"
//               >
//                 <FiBell className="mr-2 text-teal-500" />
//                 {notification}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Logout Button */}
//         <div className="w-full">
//           <Logout onLogout={onLogout} />
//         </div>
//       </div>

//       {/* Tiny Vertical Green Line */}
//       <div
//         className="absolute right-0 top-0 bottom-0 w-[2px] bg-green-950"
//         style={{ borderRadius: "1px" }}
//       ></div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { FiBell } from "react-icons/fi";
import Logout from "../logout/Logout";

const Sidebar = ({ sidebarOpen, setSidebarOpen, departmentProfile, notifications, onLogout, setShowEditModal }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        width: "16rem",
        backgroundColor: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        transform: "translateX(0)", // Sidebar always visible
        transition: "transform 0.3s ease-in-out",
        zIndex: 40,
      }}
    >
      {/* Main Sidebar Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem",
          height: "100%",
        }}
      >
        {/* Profile Photo Section */}
        <div
          style={{
            position: "relative",
            width: "8rem",
            height: "8rem",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            marginBottom: "2rem",
          }}
        >
          {/* Rotating Green Ring */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "4px solid #0B3D3D",
              animation: "spin 5s linear infinite",
            }}
          ></div>
          {/* Profile Photo */}
          <img
            src={departmentProfile.profilePhoto}
            alt="Department Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#0B3D3D",
            marginTop: "1rem",
          }}
        >
          {departmentProfile.name}
        </h2>
        <button
          onClick={() => setShowEditModal(true)}
          style={{
            fontSize: "0.875rem",
            color: "#0B8F8F",
            textDecoration: "underline",
            marginTop: "0.5rem",
            cursor: "pointer",
          }}
          aria-label="Edit Profile"
        >
          Edit Profile
        </button>

        {/* Notifications */}
        <div style={{ marginBottom: "1.5rem", width: "100%" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#0B3D3D",
              marginBottom: "0.5rem",
            }}
          >
            Notifications
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {notifications.map((notification, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.875rem",
                  color: "#0B3D3D",
                }}
              >
                <FiBell style={{ marginRight: "0.5rem", color: "#0B8F8F" }} />
                {notification}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div style={{ width: "100%" }}>
          <Logout onLogout={onLogout} />
        </div>
      </div>

      {/* Tiny Vertical Green Line */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: "#0B3D3D",
          borderRadius: "1px",
        }}
      ></div>
    </div>
  );
};

// Keyframes for Rotation (must be added to <style> in your HTML)
const styles = document.createElement("style");
styles.textContent = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styles);

export default Sidebar;
