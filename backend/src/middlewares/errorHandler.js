const errorHandler = (err, req, res, next) => {
    console.error("❌ Error:", err);

    // 🛑 JSON Syntax Error
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON format" });
    }

    // 🛑 MongoDB Duplicate Key Error (เช่น Email ซ้ำ)
    if (err.code === 11000) {
        return res.status(400).json({ message: "Duplicate key error", error: err.keyValue });
    }

    // 🛑 MongoDB Validation Error
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Validation Error", errors: err.errors });
    }

    // 🛑 JWT Token Error
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid Token" });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token Expired" });
    }

    // 🛑 Default Error (ถ้าไม่ใช่ Error ที่รู้จัก)
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;
