const blog  = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//This is the Router file for the Blog endpoints


const getFromToken = (request) => {
  const authorization = request.get('authorization')
  if(authorization && (authorization.startsWith('bearer') || authorization.startsWith('Bearer'))){
    const splitAuth = authorization.split(' ')
    return splitAuth[1]
  }
}
blog.get('/', async (request, response) => {
    const blogs = await Blog.find({})
      .populate('author',{
        title:1,
        url:1,
        likes:1
      })
    return response.json(blogs)
  })

blog.post('/',async (req,res) =>{
  const {title, author, url, likes } = req.body

  
  // const token = getFromToken(req)

  const fromToken = jwt.verify(req.token,process.env.SECRET)

  console.log(fromToken)

  const user = await User.findById(fromToken.id)

  const newBlog = new Blog({
    title:title,
    author: user._id,
    url:url,
    likes:likes
  });

  const savedBlog = await newBlog.save();


  user.blog = user.blog.concat(newBlog._id);

  // console.log(user)
  await user.save();

  res.status(201).send(savedBlog)
})


blog.post('/:id',async(request,response) =>{
  const data = request.body
  const user = await User.find({_id:request.params.id})
  
  // console.log(user)
  const savedBlog = new Blog(data).populate('User')

  await savedBlog.save()
  console.log(savedBlog)
  
})
blog.get(`/:id`,async(request,response) =>{
  const blog = await Blog.find({_id:request.params.id})
  return response.json(blog)
})
  
blog.delete('/:id',async(request, response) =>{
    
    const toDelete = request.params.id
    const verified = jwt.verify(request.token,process.env.SECRET)


    const user = await User.findById(verified.id)

    const found = user.blog.includes(toDelete)

    if(found){

      const arr = await Blog.find({_id:request.params.id})
      if (arr.length > 0){
        await Blog.findByIdAndDelete({_id:request.params.id})
        return response.status(200).json({
         message:'It is deleted!'
        })
      }
      return response.status(200).json({
        message:'Has already been deleted'
      })
    }
    else{
      response.status(401).json({
        messeage:"Unauthorized Delete Operation!"
      })
    }
 
})


blog.put('/:id',async (req,res) =>{
  const blog = await Blog.findById(req.params.id)

  if(blog){
    const newBlog = req.body
    
    
    const savedBlog = new Blog(newBlog)
  
    await savedBlog.save()
  
    res.status(200).json({
      message:"Blog Updated"
    })
  
 
  }
})




module.exports = blog