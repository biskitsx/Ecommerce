import jwt from 'jsonwebtoken'
export class tokenManager {
    static createToken(id) {
        return jwt.sign({ id }, process.env.JWT)
    }
    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT)
    }
    static createRefreshToken(id){
        return jwt.sign({ id }, process.env.JWT, {expiresIn: "1d"})
    }
}