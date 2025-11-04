import jwt from 'jsonwebtoken'

const generateToken = (payload) => {
    const verifyOpts = {
        expiresIn: '1h',
        issuer : 'manjement_user'
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, verifyOpts)
    return token
}

export default {generateToken}