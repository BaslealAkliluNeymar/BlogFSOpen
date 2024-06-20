const {test, after ,beforeEach}  = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app.js')
const blog = require('../models/blog.js')
const mongoose = require('mongoose')
const Blog = require('../models/blog.js')

const initialNotes = [
    {
        "_id": "666ab50644119317ac36c3c5",
        "title": "This is so cool",
        "author": "Basleal Aklilu",
        "url": "https://lobalcbasleal.com",
        "likes": 12,
        "__v": 0
      },
      {
        "_id": "666ab51744119317ac36c3c7",
        "title": "This is so cool",
        "author": "Basleal Aklil sfasfsfsfafas",
        "url": "https://lobalcbasleal.com",
        "likes": 12,
        "__v": 0
      }
  ]


beforeEach( async() =>{
    await blog.deleteMany({})
    let blogObject = new Blog(initialNotes[0])
    await blogObject.save()
    let anotherObject = new Blog(initialNotes[1])
    await anotherObject.save()
})

test.only('PhoneBook is returned as Json', async () =>{
    await supertest(app)
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type',/application\/json/)
})


test.only('Trying out the body', async () =>{
    const response = await supertest(app).get('/api/blogs')

    assert.strictEqual(response.body.length,initialNotes.length)
})


test('Looking at the titles', async () =>{
    const response = await supertest(app).get('/api/blogs')

    const content = response.body.map(res => res.title)
    assert.strictEqual(content.includes('This is so cool'),true)
})


test('Adding One Might do it',async () =>{

    let data = {
            "title": "This is so cool",
            "author": "Lemmessa Dessisa",
            "url": "https://lobalcbasleal.com",
            "likes": 12
       }
    
    supertest(app)
    .post('/api/blogs')
    .send(data)
    .expect(201)
    .expect('Content-type','/application\/json/')


    const response = await supertest(app).get('/api/blogs')

    assert.strictEqual(response.body.length , initialNotes.length + 1)
})


test('Adding without title is not allowed', async () =>{


    let data = {
        "author": "Lemmessa Dessisa",
        "url": "https://lobalcbasleal.com",
        "likes": 12
    }
    supertest(app)
    .post('/api/blogs')
    .send(data)
    .expect(400)

    const response = await supertest(app).get('/api/blogs')

    assert.strictEqual(response.body.length, initialNotes.length)
})
after(async () =>{
    await mongoose.connection.close()
})