const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
      type:String,
      important:true
    },
    author: String,
    url: String,
    likes: Number
  })
  
const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog