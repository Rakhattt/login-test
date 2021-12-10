import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from'../components/Main'
import Registration from '../components/Registration'
import Login from '../components/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'registration',
    component: Registration
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
