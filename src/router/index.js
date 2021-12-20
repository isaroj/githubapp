import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin'
import Signup from '../views/Signup'
import NotFound from '../views/NotFound'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true 
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path : '/:catchAll(.*)',
    component : NotFound
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log({to});
  console.log({from});
  if (to.meta.auth && !store.getters.isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
