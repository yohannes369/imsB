// // code display all user from database

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserManagement = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/employees")
//             .then(response => {
//                 setUsers(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching users:", error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>User Management</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>    
//     );
// };

// export default UserManagement;