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