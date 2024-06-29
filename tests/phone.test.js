const {test, after ,beforeEach}  = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app.js')
// const blog = require('../models/blog.js')
const mongoose = require('mongoose')
const Blog = require('../models/blog.js')

// const initialNotes = [
//     {
//         "id": "666ab50644119317ac36c3c5",
//         "title": "This is so cool",
//         "author": "Basleal Aklilu",
//         "url": "https://lobalcbasleal.com",
//         "likes": 12,
//         "__v": 0
//       },
//       {
//         "id": "666ab51744119317ac36c3c7",
//         "title": "This is so cool",
//         "author": "Basleal Aklil sfasfsfsfafas",
//         "url": "https://lobalcbasleal.com",
//         "likes": 12,
//         "__v": 0
//       }
//   ]


// beforeEach(async () =>{
//     await Blog.deleteMany({})
//     console.log('Cleared')

//     const blogObject = initialNotes.map(blog => new Blog(blog))
    
//     const promiseArray = blogObject.map( blog =>  blog.save())
//     await Promise.all(promiseArray)
//     console.log('Saved')
//     // initialNotes.forEach(async (note) => {
//     //     let blogObject = new Blog(note)
//     //     await blogObject.save()
        
//     // })
//     console.log('Done')
//     //  let blogObject = new Blog(initialNotes[0])
//     // await blogObject.save()
//     // let anotherObject = new Blog(initialNotes[1])
//     // await anotherObject.save()
// })
test('PhoneBook is returned as Json', async () =>{
    await supertest(app)
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type',/application\/json/)

    const response = await supertest(app).get('/api/blogs')

    assert.strictEqual(response.body.length,2)
})

test('Unique id is not _id',async () =>{
    await supertest(app)
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type',/application\/json/)

    const response = await supertest(app).get('/api/blogs')
    
    let id = response.body.map(blog => Object.keys(blog))
    assert.strictEqual(id[0][0],"id")
})


test('Blog Post', async () =>{

    const firstResponse = await supertest(app).get('/api/blogs')
    let data = {
        "title": "My name is!",
        "author": "Eminem Dessisa",
        "url": "https://lobalcbasleal.com",
        "likes": 12
    }
    await supertest(app)
            .post('/api/blogs')
            .send(data)
            .expect(201)
            .expect('Content-type',/application\/json/)
    
    const response = await supertest(app).get('/api/blogs')

    console.log(response.body)
    assert.strictEqual(response.body.length, firstResponse.body.length + 1)
})
// test('Trying out the body', async () =>{
//     const response = await supertest(app).get('/api/blogs')

//     assert.strictEqual(response.body.length,initialNotes.length)
// })

test('Default Likes', async () =>{
    let data = {
        "title": "My name is!",
        "author": "Eminem Dessisa",
        "url": "https://lobalcbasleal.com"
    }
   
    await supertest(app)
    .post('/api/blogs')
    .send(data)
    .expect(201)
    .expect('Content-type',/application\/json/)

    const response = await supertest(app).get('/api/blogs')

    const mapped = response.body.filter(blog => blog.likes === 0)

    console.log(mapped)
    // assert.strictEqual(mapped.likes, 0)

    
})
test('Looking at the titles', async () =>{
    const response = await supertest(app).get('/api/blogs')

    const content = response.body.map(res => res.title)
    assert.strictEqual(content.includes('This is so cool'),true)
})


test('POST without title and url',async () =>{

    const firstResponse = await supertest(app).get('/api/blogs')
    let data = {
        "author": "Eminem Dessisa",
        "likes":12
    }

    await supertest(app)
    .post('/api/blogs')
    .send(data)
    .expect(404)
    
    const response = await supertest(app).get('/api/blogs')

    assert.strictEqual(firstResponse.body.length,response.body.length)
    
})

test('Adding One Might do it',async () =>{

    let data = {
            "title": "This is so cool",
            "author": "Lemmessasafsafadfafdsafafdfafdssa Dessisa",
            "url": "https://lobalcbasleal.com",
            "likes": 12
       }
    
    await supertest(app)
    .post('/api/blogs')
    .send(data)
    .expect(201)
    .expect('Content-type','/application\/json/')


    const response = await supertest(app).get('/api/blogs')
    console.log(response.body)
    // assert.strictEqual(response.body.length , initialNotes.length + 1)
})


test('Adding without title is not allowed', async () =>{


    let data = {
        "title": "My name is!",
        "author": "Eminem Dessisa",
        "url": "https://lobalcbasleal.com",
        "likes": 12
    }
    await supertest(app)
    .post('/api/blogs')
    .send(data)
    .expect(400)

    const response = await supertest(app).get('/api/blogs')

    // assert.strictEqual(response.body.length, initialNotes.length)
})


test.only('Test for DELETE',async () =>{
    const firstResponse = await supertest(app).get('/api/blogs')
    let id = "6671a67cd5412928fffb5cb2"
    // await supertest(app)
    // .delete(`/api/blogs/${id}`)
    // .expect(200)

    const response = await supertest(app).get(`/api/blogs/${id}`)
    console.log(response.body)
    // assert.strictEqual(response.body.length,firstResponse.body.length - 1)
})
after(async () =>{
    await mongoose.connection.close()
})