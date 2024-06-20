const blog  = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')



blog.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
  })
  
blog.post('/',async (request, response) => {
    const blog = new Blog(request.body)

    const blogs = await blog.save()
        
    return response.status(201).json(result)

})



module.exports = blog