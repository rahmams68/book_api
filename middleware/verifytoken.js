const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('auth-token')
    // const tokenSuper = req.header('auth-super-token')

    if(!token) return res.status(401).send("Access denied!")
    // if(!token && !tokenSuper) return res.status(401).send("Access denied!")

    try {
        const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA)
        req.user = verifikasi
        next()
    }
    
    catch (error) {
        res.status(400).send("Invalid token!")
    }
}

function authSuper(req, res, next) {
    const token = req.header('auth-super-token')

    if(!token) return res.status(401).send("Access denied!")

    try {
        const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA)
        req.user = verifikasi
        next()
    }
    
    catch (error) {
        res.status(400).send("Invalid token!")
    }
}

module.exports = {auth, authSuper}