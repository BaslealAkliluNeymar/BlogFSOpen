const { test,describe } =require('node:test')
const assert = require('node:assert')


const average = require('../for_test.js').average

describe('Average', () =>{
    test('Average of [1,2,3]',() =>{
        const result = average([1,2,3])
    
        assert.equal(result, 2)
    })
    
    
    test('Average of [4,5,6]',() =>{
        const result = average([4,5,6])
        
        assert.equal(result, 5)
    })


    test('Average of []',() =>{
        assert.strictEqual(average([]), 0)
    })
})
