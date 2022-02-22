const pool = require("../db/db")
const {hash} = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')
const { getUserById } = require("../db/user.db")

// dev controllers

exports.getUsers = async (req, res) => {
    try {
        const {rows} = await pool.query("SELECT * FROM users")

        res.json(rows)

    } catch (error) {
        console.log(error.message)
    }
}

// app controllers

exports.newUser = async (req, res) => {
    const {email, username, password} = req.body
    const lowercase_email = email.toLowerCase()
    try {
        const hashedPassword = await hash(password, 10)

        await pool.query('INSERT INTO users(email, username, password) VALUES($1, $2, $3)', [
            lowercase_email, username, hashedPassword
        ])

        return res.status(201).json({
            success: true,
            message: "The signup was successful"
        })
        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    let user = req.user
    let payload = {
        id: user.user_id,
        email: user.email
    }
    try {
        const token = await sign(payload, SECRET)

        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'Logged in succesfuly'
        })
        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.forgotPass = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Email has been sent!'
        })
        // in reality it sends nothing :)
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.dashboard = async (req, res) => {
    try {
        const user = await getUserById(req.user.id)
        user.password = undefined
        return res.status(200).json({
            info: user
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly: true}).json({
            success: true,
            message: 'Logged out succesfully'
        })
        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.home = async (req, res) => {
    try {
        return res.status(200).json({
            info: "Main home protected data"
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}