import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

//避免非管理者進入管理者頁面
// const authorizeIsAdmin = (to, from, next) => {
//   const currentUser = store.state.currentUser
//   if (currentUser && currentUser.role !== 'admin') {
//     next('/404')
//     return
//   }
//   next()
// }


const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue')
  },
   {
    path: '/admin',
    name: 'admin-root',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue'),
    // beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    // beforeEnter: authorizeIsAdmin
  },
  {
    path: '*',
    name: 'Not-found',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
