const jwt = require('jsonwebtoken');

const tokenGenerator = userId => {
    return jwt.sign({id: userId}, 'nodejs',{
        expiresIn: '30d',
    });
};

module.exports = tokenGenerator;