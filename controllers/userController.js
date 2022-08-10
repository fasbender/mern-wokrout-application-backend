const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const randomstring = require('randomstring')

const randomString = randomstring.generate({
    length: 40,
    charset: 'alphabetic'
})

const createToken = (_id) => {
    return jwt.sign({ _id }, randomString, { expiresIn: '3d' })
}

//login user
const loginUser = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async(req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    signupUser,
    loginUser
}