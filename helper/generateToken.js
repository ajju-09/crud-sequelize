const jwt = require('jsonwebtoken');

const generateJWT = (generator) => {
    try {
        // sign token
        const token = jwt.sign(generator, process.env.JWT_SECRET, { expiresIn: '1d'});
        return token
    } catch (error) {
        console.log(error);
    }
}

module.exports = generateJWT;