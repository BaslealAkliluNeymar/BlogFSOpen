const LoginRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

LoginRouter.post('/',async (req,res) =>{
    const {username,password} = req.body
    
    const user = await User.findOne({username})

    
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    
    if (passwordCorrect){
        const forToken = {
            username:username.username,
            id:user._id
        }
        const signature = jwt.sign(forToken, process.env.SECRET)
    
        return res.status(201).json({
            signature,
            id:user._id,
            username:user.username
        })
    }
    else{
        return res.status(204).end({
            message:"Password Incorrect"
        })
    }
})


module.exports = LoginRouter