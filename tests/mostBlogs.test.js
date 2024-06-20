const { test, describe } = require('node:test')
const assert = require('node:assert')


const mostBlogs = require('../utils/list_helper.js').mostBlogs


describe('MOST BLOGS',() =>{
    test('THE AUTHOR WITH THE MOST BLOGS', () =>{
        let data = [
            {
              title: "Understanding JavaScript Closures",
              author: "Jane Doe",
              url: "https://example.com/javascript-closures",
              likes: 124
            },
            {
                title: "Understanding JavaScript Closures",
                author: "Jane Doe",
                url: "https://example.com/javascript-closures",
                likes: 124
              },
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
          
          const result = mostBlogs(data)
          let max = {
            author:"Jane Doe",
            blogs:3
          }
        assert.deepStrictEqual(result,max)
          
    })
})