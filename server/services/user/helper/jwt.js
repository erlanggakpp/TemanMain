const jwt = require('jsonwebtoken');

function createToken(payload) {
    return jwt.sign(payload, 'teman-main-user');
}

function verifyToken(token) {
    return jwt.verify(token, 'teman-main-user');
}

module.exports = { createToken, verifyToken }