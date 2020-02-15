<template>
  <div id="add-blog">
      <h2>Add a New Blog Post</h2>
      <form action="">
          <label >Blog Title:</label>
          <input type="text" required v-model="blog.title">
          <label >Blog Content:</label>
          <textarea name="" id="" cols="" rows="" v-model="blog.content" required></textarea>
          <label >Author</label>
          <input type="text" v-model="blog.author" required>
          <div id="checkboxes">
              <label >Sports</label>
              <input type="checkbox" value="sports" v-model="blog.categories">
              <label >Music</label>
              <input type="checkbox" value="music" v-model="blog.categories">
              <label >Fashion</label>
              <input type="checkbox" value="fashion" v-model="blog.categories">
              <label >Family</label>
              <input type="checkbox" value="family" v-model="blog.categories">
              

          </div>
          <button v-if="status" @click.prevent="post"  >Add Blog</button>
          <button v-else @click.prevent="updatePost(blog.id)" type="submit">updatePost</button>
          
        


      </form>

      <div id="preview">
          <h2>Preview Blog</h2>
          <p>Blog Title: {{blog.title}}</p>
          <p>Blog content:</p>
          <p> {{blog.content}}</p>
          <p>Author: {{blog.author}}</p>
          <ul>
              <li v-for="category in blog.categories">
                  <div>{{category}}</div>
                </li>
          </ul>

      </div>
      <div id="showBlog">
          <button @click="showBlogs"> Show Blogs</button>
         
        <div v-for="(blog, i) in blogs" :key="i" class="single-blog">
             <span >
                 <h2>{{blog.title}}</h2>
            <article>{{blog.content}}</article>
            <p>Written by: {{blog.author}}</p>
             </span>
            
            <ul>
            <li v-for="category in blog.categories">
                <div>{{category}}</div>
                
            </li>
        </ul>
            <button @click="editPost(blog)">Edit</button>
            <button @click.prevent="removePost(blog.id)" type="submit">Delete</button>
            
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
    data(){
        return{
             blogs: [],
            blog: {
                title: '',
            content: '',
            categories:[],
            author: ""
            
            },
            submitted: false,
            status: true,
        
            
        }
    },
    methods: {
        post: function(){
            this.$http.post('https://blogproject-7f9ce.firebaseio.com/posts.json',this.blog).then(function(data){
                console.log(data);
                this.reload()
                
                
            })
        },

        showBlogs: function(){
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
        },
        removePost(i){
            console.log(i)
            this.$http.delete(`https://blogproject-7f9ce.firebaseio.com/posts/${i}.json`).then(function(res){
                console.log(res);
                this.reload();
                
            })

            // console.log(i)
            // this.$http.delete(`https://blogproject-7f9ce.firebaseio.com/posts/${i}.json`).then(function(res){
            //     console.log(res);
            // }, function(error){
            //     console.log(error);
            // }),
        },
        reload(){
            var timeout = setTimeout("location.reload(true);",6000);
            function resetTimeout(){
                clearTimeout(timeout);
                timeout = setTimeout('location.reload (true);', 6000)
            }

        },
        editPost(id){
            this.blog = id;
            this.status = !this.status
        },
        updatePost(i){
            this.$http.put(`https://blogproject-7f9ce.firebaseio.com/posts/${i}.json`, this.blog).then(function(res){
                console.log(res);
                // this.reload();
            }, function(error){
                console.log(error)
            })
            this.status = true;
            this.reload()
            

        }

    }
}
</script>

<style scoped>
#add-blog *{
    box-sizing: border-box;
}
#add-blog{
    margin: 20px auto;
    max-width: 500px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type='text'], textarea {
    display: block;
    width: 100%;
    padding: 8px;
}
#preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
h3{
    margin-top: 10px;
}
#checkboxes input{
    display: inline-block;
    margin-left: 10px
}
#checkboxes label{
    display: inline-block;
    margin-left: 5px

}
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
