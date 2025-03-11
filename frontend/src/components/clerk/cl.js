// import React from 'react'
// // import AddItem from '../clerk/f'
// import ItemList from '../clerk/itemlist'
// function Cl() {
//   return (
//     <div>well coemclerk
//       {/* <AddItem /> */}
//     {/* <AddItem /> */}
//     <ItemList />
//     </div>
//   )
// }

// export default Cl
import React from 'react';
import ItemList from '../clerk/itemlist';
// import AddItem from '../clerk/f'; // Uncomment if you want to include AddItem later

function Cl() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header Section */}
      <div className="bg-teal-600 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome, Clerk!</h1>
          <p className="mt-2 text-sm md:text-base">Manage your inventory efficiently</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Uncomment the following if you want to include AddItem */}
          {/* <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Item</h2>
            <AddItem />
          </div> */}

          {/* Item List Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory List</h2>
            <ItemList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cl;