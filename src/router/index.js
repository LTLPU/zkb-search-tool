import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Copyright from '../views/Copyright.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/copyright',
    name: 'copyright',
    component: Copyright
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
