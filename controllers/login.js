const LoginRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

LoginRouter.post('/',async (req,res) =>{
    const {username,password} = req.body
    // console.log(password)
    const user = await User.findOne({username})

    // console.log(user)
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    // console.log(passwordCorrect)
    if (!(passwordCorrect && user)){
        res.status(204).json({
            message:"Password Incorrect"
        })
    }
    const forToken = {
        username:username.username,
        id:user._id
    }
    const signature = jwt.sign(forToken, process.env.SECRET)

    res.status(201).json({
        signature,
        id:user._id,
        username:user.username
    })
})


module.exports = LoginRouter