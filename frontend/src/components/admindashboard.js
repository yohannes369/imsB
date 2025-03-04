

export default function AdminDashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };  
//fech databse and display on browser
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }   
  }


  return (
    <div>
      <h1>Admin Dashboard</h1>
 
  
      <button onClick={fetchData}>Fetch Data</button>
      <br />
      <button onClick={logout}>Logout
      </button>

    </div>
  );
}