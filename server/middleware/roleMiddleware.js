module.exports = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // authMiddleware must run before this
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: "User not authenticated",
        });
      }

      const role = req.user.role;

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        message: "Role check failed",
        error: err.message,
      });
    }
  };
};