const redis = require('../helper/redis.js')
const axios = require('axios')

class UserController {
    static async readAllUser (req, res) {
        try {
            const usersCache = await redis.get("user:users")

            if (usersCache) {
                const users = JSON.parse(usersCache)

                res.status(200).json(users)
            } else {
                const { data: users } = await axios({
                    method: "GET",
                    url: "http://localhost:4001/users"
                })

                await redis.set("user:users", JSON.stringify(users))

                res.status(200).json(users)
            }
        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }

    static async createUser(req, res) {
        try {
            const data = req.body

            const { data: newUser } = await axios({
                method: "POST",
                url: "http://localhost:4001/users",
                data
            })

            await redis.del("user:users")

            res.status(201).json(newUser)

        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }

    static async showUser(req, res) {
        try {
            const { id } = req.params

            const { data: user } = await axios({
                method: "GET",
                url: "http://localhost:4001/users/" + id,
            })

            res.status(200).json(user)
    
        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params
            const data = req.body
            
            const { data: user } = await axios({
                method: "PUT",
                url: "http://localhost:4001/users/" + id,
                data
            })

            await redis.del("user:users")

            res.status(200).json(user)

        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params

            const { data: user } = await axios({
                method: "DELETE",
                url: "http://localhost:4001/users/" + id,
            })

            await redis.del("user:users")

            res.status(200).json(user)
            
        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }

    static async registerAdmin(req, res) {
        try {
            const data = req.body
            const { data: newUser } = await axios({
                method: "POST",
                url: "http://localhost:4001/users/register",
                data
            })

            await redis.del("user:users")

            res.status(201).json(newUser)

        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }

    static async loginAdmin(req, res) {
        try {
            const data = req.body

            const { data: user } = await axios({
                method: "POST",
                url: "http://localhost:4001/users/login",
                data
            })

            res.status(200).json(user)

        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }

    static async registerVisitor(req, res) {
        try {
            const data = req.body
            const { data: newUser } = await axios({
                method: "POST",
                url: "http://localhost:4001/users/public/register",
                data
            })

            await redis.del("user:users")

            res.status(201).json(newUser)
            
        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }

    static async loginVisitor(req, res) {
        try {
            const data = req.body

            const { data: user } = await axios({
                method: "POST",
                url: "http://localhost:4001/users/public/login",
                data
            })

            res.status(200).json(user)

        } catch (error) {
            const { status, data } = error.response

            res.status(status).json(data)
        }
    }
}

module.exports = UserController