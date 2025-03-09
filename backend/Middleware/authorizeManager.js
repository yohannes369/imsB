export const authorizeManager = (req, res, next) => {
    // Check if the user's role is 'manager'
    if (req.user.role !== 'manager') {
      return res.status(403).json({ error: "Access denied. You don't have permission to manage items." });
    }
    next();
  };
  