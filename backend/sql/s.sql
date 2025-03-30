CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Staff', 'Department', 'Clerk', 'Manager') NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    profile_photo VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0),
    item_model VARCHAR(100) DEFAULT NULL,
    item_serial VARCHAR(100) UNIQUE DEFAULT NULL,
    item_category VARCHAR(50) DEFAULT NULL,
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL, -- Foreign key to Employees
    item_id INT NOT NULL, -- Foreign key to Items
    quantity INT NOT NULL CHECK (quantity > 0), -- Ensures a positive quantity
    status ENUM('Pending', 'Accepted', 'Declined') DEFAULT 'Pending',
    dept_comment TEXT, -- Department's comment (e.g., "Insufficient stock")
    clerk_comment TEXT, -- Clerk's comment (e.g., "Available at Room 101")
    dept_action_at TIMESTAMP NULL, -- Timestamp for department's action
    clerk_action_at TIMESTAMP NULL, -- Timestamp for clerk's action
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Request creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auto-updates on change
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




-- Create the `items` table to store item information
CREATE TABLE items (
    item_id VARCHAR(50) PRIMARY KEY, -- Unique identifier for the item
    item_code VARCHAR(50) NOT NULL UNIQUE, -- Unique code for the item
    item_name VARCHAR(255) NOT NULL, -- Name of the item
    item_type VARCHAR(255) NOT NULL, -- Type/category of the item
    quantity INT NOT NULL CHECK (quantity >= 0), -- Current stock quantity (non-negative)
    item_model VARCHAR(255), -- Model of the item
    item_serial VARCHAR(255), -- Serial number of the item
    item_category VARCHAR(255), -- Category of the item
    threshold INT DEFAULT 5, -- Minimum stock level before triggering a notification
    reg_date DATE DEFAULT CURRENT_DATE, -- Registration date of the item
    status ENUM('Active', 'Inactive') DEFAULT 'Active', -- Status of the item
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the item was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp when the item was last updated
);

-- Create the `item_requests` table to handle staff requests for items
CREATE TABLE item_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for the request
    item_id VARCHAR(50) NOT NULL, -- Foreign key referencing the item
    employee_id VARCHAR(50) NOT NULL, -- Foreign key referencing the employee making the request
    quantity_requested INT NOT NULL CHECK (quantity_requested > 0), -- Quantity requested by the staff
    status ENUM('Pending', 'Accepted', 'Rejected') DEFAULT 'Pending', -- Status of the request
    comment TEXT, -- Comment from the department or clerk
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the request was made
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);

-- Create the `item_history` table to track item transactions
CREATE TABLE item_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for the history record
    item_id VARCHAR(50) NOT NULL, -- Foreign key referencing the item
    employee_id VARCHAR(50) NOT NULL, -- Foreign key referencing the employee who took the item
    action_type ENUM('Issued', 'Returned') NOT NULL, -- Action type (Issued or Returned)
    quantity INT NOT NULL CHECK (quantity > 0), -- Quantity involved in the transaction
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of the transaction
    comment TEXT, -- Comment from the clerk
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);

-- Create the `notifications` table to store low stock notifications
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for the notification
    item_id VARCHAR(50) NOT NULL, -- Foreign key referencing the item
    message TEXT NOT NULL, -- Notification message
    is_read BOOLEAN DEFAULT FALSE, -- Whether the notification has been read
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the notification was created
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);

-- Trigger to automatically notify when an item's stock falls below the threshold
DELIMITER $$
CREATE TRIGGER notify_low_stock
AFTER UPDATE ON items
FOR EACH ROW
BEGIN
    IF NEW.quantity < NEW.threshold THEN
        INSERT INTO notifications (item_id, message)
        VALUES (NEW.item_id, CONCAT('Low stock alert for item: ', NEW.item_name, '. Current quantity: ', NEW.quantity));
    END IF;
END$$
DELIMITER ;

-- Create a view for analyzing and forecasting item usage
CREATE VIEW item_usage_analysis AS
SELECT 
    i.item_id,
    i.item_name,
    i.item_type,
    i.quantity AS current_stock,
    SUM(CASE WHEN h.action_type = 'Issued' THEN h.quantity ELSE 0 END) AS total_issued,
    SUM(CASE WHEN h.action_type = 'Returned' THEN h.quantity ELSE 0 END) AS total_returned,
    (SUM(CASE WHEN h.action_type = 'Issued' THEN h.quantity ELSE 0 END) - SUM(CASE WHEN h.action_type = 'Returned' THEN h.quantity ELSE 0 END)) AS net_usage,
    COUNT(r.request_id) AS total_requests
FROM items i
LEFT JOIN item_history h ON i.item_id = h.item_id
LEFT JOIN item_requests r ON i.item_id = r.item_id
GROUP BY i.item_id, i.item_name, i.item_type, i.quantity;













CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for the notification
    item_id VARCHAR(50) NOT NULL, -- Foreign key referencing the item
    message TEXT NOT NULL, -- Notification message
    is_read BOOLEAN DEFAULT FALSE, -- Whether the notification has been read
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the notification was created
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE -- Foreign key constraint
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT, -- Unique identifier for each request
  `employee_id` varchar(255) NOT NULL, -- ID of the employee making the request (foreign key)
  `item_id` varchar(255) NOT NULL, -- ID of the requested item (foreign key)
  `item_name` varchar(255) NOT NULL, -- Name of the requested item
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0), -- Requested quantity (must be positive)
  `status` enum('Pending','Accepted','Declined') DEFAULT 'Pending', -- Request status
  `dept_comment` text DEFAULT NULL, -- Department comment (optional)
  `clerk_comment` text DEFAULT NULL, -- Clerk comment (optional)
  `dept_action_at` timestamp NULL DEFAULT NULL, -- Time of department action
  `clerk_action_at` timestamp NULL DEFAULT NULL, -- Time of clerk action
  `alert` tinyint(1) DEFAULT 0, -- Alert status (0 = no alert, 1 = alert)
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- When the request was created
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), -- Last update time
  PRIMARY KEY (`request_id`), -- Primary key for the table
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE, -- Foreign key for employee_id
  FOREIGN KEY (`item_id`) REFERENCES `items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE -- Foreign key for item_id
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;









 //corect one 
-- Drop existing tables if they exist (optional, only if you want to start fresh)
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `requests`;

-- Table: `notifications`
-- Purpose: Stores notifications related to employee requests, linked to employees and requests.
- Table: `requests`
-- Purpose: Manages item requests made by employees, including status and comments.
CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT, -- Unique identifier for each request
  `employee_id` varchar(255) NOT NULL, -- ID of the employee making the request (foreign key)
  `item_id` varchar(255) NOT NULL, -- ID of the requested item (foreign key)
  `item_name` varchar(100) NOT NULL, -- Name of the requested item
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0), -- Requested quantity (must be positive)
  `status` enum('Pending','Accepted','Declined') DEFAULT 'Pending', -- Request status
  `dept_comment` text DEFAULT NULL, -- Department comment (optional)
  `clerk_comment` text DEFAULT NULL, -- Clerk comment (optional)
  `dept_action_at` timestamp NULL DEFAULT NULL, -- Time of department action
  `clerk_action_at` timestamp NULL DEFAULT NULL, -- Time of clerk action
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(), -- When the request was created
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), -- Last update time
  PRIMARY KEY (`request_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE,
  FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;