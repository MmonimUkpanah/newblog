<template>
    <div id="showBlog">
        <h1 class="middle"> All Blog Articles</h1>
        <div v-for="blog in blogs" class="single-blog">
            <span class="middle">
                <h2>{{blog.title}}</h2>
            <article>{{blog.content}}</article>
            <p>Written by: {{blog.author}}</p>
            </span>
            
            <ul>
            <li v-for="category in blog.categories">{{category}}</li>
        </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            blogs: []

        }
    },
    methods: {

    },
    created(){
        this.$http.get('https://blogproject-7f9ce.firebaseio.com/posts.json').then(function(data){
            return data.json();
        }).then(function(data){
            var blogsArray = [];
            for (let key in data){
                data[key].id = key
                blogsArray.push(data[key])
            }
            console.log(blogsArray);
            this.blogs = blogsArray
        })
    }
}
</script>
<style  scoped>
#showBlog{
    max-width: 800px;
    margin: 0 auto;
    
}
.single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
}
.middle{
    text-align:center;
}

</style>