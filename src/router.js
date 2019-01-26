import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:number',
      name: 'post',
      component: () => import('./views/Post')
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('./views/Archive')
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('./views/Book')
    },
    {
      path: '/friend',
      name: 'friend',
      component: () => import('./views/Friend')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About')
    }
  ]
})
