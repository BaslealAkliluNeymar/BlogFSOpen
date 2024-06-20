const { test, describe } = require('node:test')
const assert = require('node:assert')


const favoriteBlog = require('../utils/list_helper.js').favoriteBlog


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
            }
          ];
          let max = [
            {
                title: "Mastering CSS Grid Layout",
                author: "Alice Johnson",
                url: "https://example.com/css-grid-layout",
                likes: 150
              }
          ]
          const result = favoriteBlog(data)

        assert.deepStrictEqual(result,max)
          
    })
})