<template>
  <div id="app">
    <app-header/>
    
    
    <router-view/>
    
  </div>
</template>


<script>
import addBlog from './components/addBlog.vue'
import showblog from './components/showblog.vue'
import header from './components/header'
export default {
  components: {
    'add-blog': addBlog,
    'show-blog': showblog,
    'app-header': header,
  
  },
  
}
</script>

<style>
body{
  margin: 0;
}
</style>
