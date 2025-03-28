hello
ALTER TABLE items ADD COLUMN id INT;
npm install -D tailwindcss@3
npx tailwindcss init




npm install @heroicons/react
npm install react-icons 


npm install react-i18next i18next   this for language commaned 


npm install typescript@latest


npm install react-barcode axios react-icons
 
CREATE TABLE Employees (
    employee_id VARCHAR(50) PRIMARY KEY, -- Unique ID for each employee (e.g., E123)
    first_name VARCHAR(50) NOT NULL,     -- Employee's first name
    last_name VARCHAR(50) NOT NULL,      -- Employee's last name
    email VARCHAR(100) UNIQUE NOT NULL,  -- Employee's email (must be unique)
    password VARCHAR(255) NOT NULL,      -- Hashed password for security
    role ENUM('Admin', 'Manager', 'Staff','Clerk') NOT NULL, -- Role of the employee
    phone_number VARCHAR(15),            -- Employee's phone number (optional)
    profile_photo VARCHAR(255),          -- Optional photo URL
    status ENUM('Active', 'Inactive') DEFAULT 'Active', -- Employment status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of creation
);

npm run build
 After fixing the issue, clear any build cache and rebuild the project:


 npm install recharts --legacy-peer-deps

--legacy-peer-deps use for conflicate dependecy use this one 








