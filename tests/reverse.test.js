const { test,describe } = require('node:test')
const assert = require('node:assert')



const reverse = require('../for_test.js').reverse

describe('Reverse',() =>{
    
    test('reverse of a',() =>{
        const result = reverse('a')
    
        assert.strictEqual(result, 'a')
    })
    
    test('reverse of react',() =>{
        const result = reverse('result')
    
        assert.strictEqual(result,'tluser')
    })
    
    
    test('reverse of saippuakauppias', () => {
        const result = reverse('saippuakauppias')
      
        assert.strictEqual(result, 'saippuakauppias')
      })
})
