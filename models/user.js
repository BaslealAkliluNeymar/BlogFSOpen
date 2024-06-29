const mongo = require('mongoose')
const Blog = require('./blog')


const userSchema = new mongo.Schema({
    username:String,
    name:String,
    passwordHash:String,
    blog:[
            {
                type:mongo.Schema.Types.ObjectId,
                ref:'Blog'
            }
        ]
    })


const User = new mongo.model("User",userSchema)

module.exports = User