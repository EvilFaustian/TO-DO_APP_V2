import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App'
import Archive from '../components/ArchivePage'
import Login from '../components/LoginPage'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(store.state.authenticated == false) {
        next("/login")
      } else {
        next();
      }
    }
  },
  {
    path: '/archive',
    name: 'archive',
    component: Archive,
    beforeEnter: (to, from, next) => {
      if(store.state.authenticated == false) {
        next("/login")
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router