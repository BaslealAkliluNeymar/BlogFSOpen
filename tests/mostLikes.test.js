const { test, describe } = require('node:test')
const assert = require('node:assert')


const mostLikes = require('../utils/list_helper.js').mostLikes


describe('FAVORITE BLOG',() =>{
    test('THE FAVORITE BLOG FOR DATA', () =>{
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
            },
            {
                title: "Mastering CSS Grid Layout",
                author: "Janice Johnson",
                url: "https://example.com/css-grid-layout-v3",
                likes: 150
              }
          ];
          let max = [
            {
                author: "Alice Johnson",
                likes: 150
              }
            ]
          
          const result = mostLikes(data)

        assert.deepStrictEqual(result,max)
          
    })
})