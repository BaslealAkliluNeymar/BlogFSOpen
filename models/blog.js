const mongoose = require('mongoose')
const User = require('./user')
const blogSchema = new mongoose.Schema({
    title: {
      type:String,
      important:true
    },
    author: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    url: {
      type:String,
      important:true
    },
    likes: {
      type:Number,
      default:0
    }
  })
  
const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog