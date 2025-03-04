

export default function ManagerDashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };  
  return (
    <div>
      <h1>Admin Dashboard</h1>
 
      
      <button onClick={logout}>Logout
      </button>

    </div>
  );
}