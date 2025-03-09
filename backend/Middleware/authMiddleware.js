import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "book"; // Ensure the JWT secret key is set

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next(); // Pass control to the next middleware function
  } catch (ex) {
    res.status(400).json({ error: "Invalid token." });
  }
};




