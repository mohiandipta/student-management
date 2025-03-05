const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key"; // Use env variables for security

const authenticate = (req) => {
    if (!req.headers || !req.headers.authorization) return null;

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!token) return null;

    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null;
    }
};

module.exports = authenticate;
