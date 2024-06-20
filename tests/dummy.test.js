const { test, describe} = require('node:test')
const assert = require('node:assert')


const dummy = require('../utils/list_helper').dummy


describe('DUMMY TEST',() =>{
    test('Dummy returns one', () =>{
        const result = dummy([])
        assert.strictEqual(result,1)
    })
})