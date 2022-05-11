const { book } = require("../models")

module.exports = class {
    static async getBook(req, res, next) {
        try {
            const result = await book.findAll()
            res.status(200).json({
                status: 200,
                data: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async addBook(req, res) {
        try {
            const result = await book.create(req.body)
            res.status(201).json({
                status: 201,
                message: "data buku sudah ditambahkan",
                data: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async updateBook(req, res, next) {
        try {
            const result = await book.update(req.body, {
            where: {id: req.params.id}
            })
            res.status(201).json({
                status: 201,
                message: "data buku sudah diubah",
                data: req.body
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteBook(req, res, next) {
        try {
            await book.softDelete({
            where: {id: req.params.id}
            })
            res.status(201).json({
                status: 201,
                message: "data buku sudah dihapus"
            })
        } catch (error) {
            console.log(error);
        }
    }
}