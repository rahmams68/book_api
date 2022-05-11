const bcrypt = require('bcryptjs')
const { users } = require('../models')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

module.exports = class {
    static async register(req, res, next) {
       try {
           const salt = bcrypt.genSaltSync(10)
           const hashedPass = await bcrypt.hashSync(req.body.pass, salt)

           await users.create({
               username: req.body.username,
               pass: hashedPass,
               type: req.body.type
           })

           res.status(201).json({
               status: 201,
               message: "User baru telah ditambahkan",
               info: req.body
           })
       }

       catch(err) {
           console.log(err)
       }
    }

    static async login(req, res, next) {
        try {
            const getData = await users.findOne({
                where : {username: req.body.username}
            })

            if(!getData) res.status(400).send("Login gagal!")

            const passCompare = bcrypt.compareSync(req.body.pass, getData.pass)

            if(!passCompare) res.status(400).send("Login gagal!")

            const token = jwt.sign({_username: getData.username}, process.env.TOKEN_RAHASIA)

            if(getData.type === "superAdmin") res.header('auth-super-token', token).send("Login super berhasil!")

            res.header('auth-token', token).send("Login berhasil!")
        }
        
        catch (error) {
            console.log(error)
            res.status(400).send("ERROR")
        }
    }

    static async getUser(req, res, next) {
        try {
            const result = await users.findAll()
            res.status(200).json({
                status: 200,
                data: result
            })
        }
        
        catch (error) {
            console.log(error)
            res.status(400).send("ERROR")
        }
    }
}