//This is the Router file for all api endpoints concerning users

const user = require('express').Router() // Router for users
const User = require('../models/user') // User model 
const mongo = require('mongoose')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')


user.get('/',async (req,res) =>{
    const all = await User.find({}).populate("blog")
    res.status(200).json(all)
})


user.post('/',async (req,res) =>{
    // const {username, name , passwordHash} = req.body

    // const all = await User.find({})
    // const found = await User.find({username})
    // console.log(`----${req.body}`)
    // console.log(`----${found}`)
    // if (found){
    //     return res.status(401).json({
    //         message:"Username already in use!"
    //     })
    // }
    // if(!(req.body && username && (username.length > 3 && passwordHash.length > 3))){
    //     return res.status(401).json({
    //         message:"Please Fill in the required informations!"
    //     })
    // }

    // // console.log(data.passwordhash)
    // const saltRounds = 10
    // hashedPassword = await bcrypt.hash(passwordHash,10)

    // const user = new User({
    //     username,
    //     name,
    //     passwordHash:hashedPassword
    // })

    // const savedUser = await user.save()

    // res.status(201).json(all)

    const {username ,name, passwordHash} = req.body


    const all = await User.find({username}).populate('blog',{})

    if(all.length > 0){
        return res.status(401).json({
            message:"Username Already Exists"
        })
    }

    if(username.length < 3 || passwordHash.length < 3){
        return res.status(401).json({
            message:"Username and/or password length insufficient"
        })
    }

    
    
    const saltRounds = 10

    const hashed = await bcrypt.hash(passwordHash, saltRounds)


    const newUser = new User({
        username,
        name,
        passwordHash:hashed
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
})



module.exports = user
