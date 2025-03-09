CREATE TABLE `item` (
  `Item_Name` varchar(30) NOT NULL,
  `Item_Type` varchar(20) NOT NULL,
  `Item_Code` varchar(30) NOT NULL,
  `Quantity` varchar(30) NOT NULL,
  `Item_Model` varchar(30) NOT NULL,
  `Item_Serial` varchar(30) NOT NULL,
  `Item_Category` varchar(12) NOT NULL,
  `Reg_Date` varchar(15) NOT NULL,
  `Status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`