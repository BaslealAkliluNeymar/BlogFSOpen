const { test, describe } = require('node:test')
const assert = require('node:assert')


const totalLikes = require('../utils/list_helper.js').totalLikes


describe('TOTAL LIKES',() =>{
    test('Total likes for Data', () =>{
        let data = [
            {
              title: "Understanding JavaScript Closures",
              author: "Jane Doe",
              url: "https://example.com/javascript-closures",
              likes: 124
            },
            {
              title: "A Deep Dive into React Hooks",
              author: "John Smith",
              url: "https://example.com/react-hooks",
              likes: 89
            },
            {
              title: "Mastering CSS Grid Layout",
              author: "Alice Johnson",
              url: "https://example.com/css-grid-layout",
              likes: 150
            }
          ];
          
          const result = totalLikes(data)

          assert.strictEqual(result,363)
          
    })
})