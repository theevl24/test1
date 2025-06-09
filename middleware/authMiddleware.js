const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key';

const authMiddleware = (req, res, next) => {
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith('Bearer')) {
return res.status(401).json({ message: 'Token not found' });
}

const token = authHeader.split(' ')[1];
try {
const decoded = jwt.verify(token, JWT_SECRET);
req.user = decoded;
next();
} catch (error) {
return res.status(401).json({ message: 'Invalid token' });
}
};

module.exports = authMiddleware;