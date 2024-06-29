const bcrypt = require('bcrypt')
const assert = require('node:assert')
const User = require('../models/user')
const supertest = require('supertest')
const {test, beforeEach, after,describe} = require('node:test')
const mongo = require('mongoose')
const app = require('../app')
const { application } = require('express')

describe('Testing User Model', async () =>{
    beforeEach(async () =>{
       await User.deleteMany({})
    })
    test('Registering',async () =>{
        const userStart = User.find({})


        const user = {
            username:"Basleal Alilu",
            name:"Basleal",
            passwordHash:"dsalfeioruw"
        }

        await supertest(app)
                .post('/api/users')
                .send(user)
                .expect(201)
                .expect('Content-type',/application\/json/)



        const userEnd = User.find({})
        // assert.strictEqual(userStart + 1 ,userEnd)
    })

})


test('Testing Creation of a user ',async () =>{

    const all = await supertest(app).get('/api/users')
    const person  = {
        username:"Basleal Aklilu",
        name:"Basleal Aklilu",
        passwordHash:"1234"
    }

    await supertest(app)
        .post('/api/users')
        .send(person)
        .expect(401)
        .expect('Content-type',/application\/json/)

    const second = await supertest(app).get('/api/users')

    assert.strictEqual(all.length, second.length)

    
})


test.only('Without Token',async () =>{
    const first = await supertest(app).get('/api/blogs')
    const blog = {
        "title":"The Famous Story of Menelik II",
        "author":"667fc48409b627f68100ce62",
        "url":"https://localhost:3001",
        "likes":60     
    }
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2ZjNDg0MDliNjI3ZjY4MTAwY2U2MiIsImlhdCI6MTcxOTY1MDI2M30.9ZAjIdtXw-O30n-z0b1fzI23viJc5OOmNOO65QvZmRI'
    const response = await supertest(app)
        .post('/api/blogs')
        .send(blog)
        .expect(401)
        .expect('Content-type',/application\/json/)

    console.log(response)
    const second = await supertest(app).get('/api/blogs')
    // assert.strictEqual(first.body.length,second.body.length)
})

after(() =>{
    mongo.connection.close()
})

