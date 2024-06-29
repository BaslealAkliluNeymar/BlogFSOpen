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


test.only('Testing Creation of a user ',async () =>{

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


after(() =>{
    mongo.connection.close()
})

