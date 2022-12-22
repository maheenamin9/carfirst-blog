// authentication middleware

const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next){
    // if not token provided at all
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. no token provided');

    // verify the token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}