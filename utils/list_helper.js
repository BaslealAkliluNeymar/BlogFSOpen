const dummy = (blogs) =>{
    return 1
}


const totalLikes = (data) =>{
    let total = 0
    data.forEach((blog) =>{
        total += blog.likes
    })
    return total
}


const favoriteBlog = (blogs) =>{
   const arr = blogs.filter(blog => blog.likes ===  Math.max(...blogs.map(blog => blog.likes)))
   return arr
}

const mostLikes = (blogs) =>{
    const arr = blogs.filter(blog => blog.likes ===  Math.max(...blogs.map(blog => blog.likes)))

    const mostLiked = {
        author: arr[0].author,
        likes:arr[0].likes
    }
    return [mostLiked]
}

const mostBlogs = (blogs) =>{
   
    const knownBlogs = blogs.reduce((acc,blog) =>{
        if(blog.author){
            acc[blog.author] = (acc[blog.author] || 0) + 1
        }
        return acc
    },{})    
    const maxBlogs = Math.max(...Object.values(knownBlogs))
    const maxName = Object.keys(knownBlogs).find(author =>{
       return  knownBlogs[author] === maxBlogs
    })
    return {
        author:maxName,
        blogs:maxBlogs
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
}