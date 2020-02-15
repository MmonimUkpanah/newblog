import Vue from 'vue'
import VueRouter from 'vue-router'
import showblog from '../components/showblog.vue'
import addBlog from '../components/addBlog.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'showblog',
    component: showblog
  },
  {
    path: '/addBlog',
    name: 'addBlog',
    component: addBlog
  },
 
  // {
  //   path: '/a',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
