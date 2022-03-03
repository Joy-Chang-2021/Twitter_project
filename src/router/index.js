import Vue from 'vue'
import store from './../store'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Main from '../views/Main.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role === "user") {
    return next('/signin')
  }
  next()
}

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role === "admin") {
    return next('/admin/signin')
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },

  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue'),
    beforeEnter: authorizeIsUser,
    children: [
      {
        path: "",
        redirect: { name: "main" }
      },
      {
        path: 'main',
        name: 'main',
        component: Main,
      },
      {
        path: 'tweet/:id',
        name: 'tweet',
        component: () => import('../views/Tweet.vue'),
      },
      {
        path: "self",
        name: "self",
        component: () => import('../views/UserSelf.vue'),
        children: [
          {
            path: "",
            redirect: { name: "selfTweet" }
          },
          {
            path: "tweet",
            name: "selfTweet",
            component: () => import('../components/TweetCardSelf.vue'),
          },
          {
            path: "reply",
            name: "reply",
            component: () => import('../components/ReplyCardSelf.vue'),
          },
          {
            path: "like",
            name: "like",
            component: () => import('../components/LikeCardSelf.vue'),
          },
        ]
      },
      {
        path: ":id",
        name: "other",
        component: () => import('../views/UserOther.vue'),
        children: [
          {
            path: "",
            redirect: { name: "otherTweet" }
          },
          {
            path: "tweet",
            name: "otherTweet",
            component: () => import('../components/TweetCardSelf.vue'),
          },
          {
            path: "reply",
            name: "otherReply",
            component: () => import('../components/ReplyCardSelf.vue'),
          },
          {
            path: "like",
            name: "otherLike",
            component: () => import('../components/LikeCardSelf.vue'),
          },
          {
            path: 'followers',
            name: 'followers',
            component: () => import('../components/FollowerCards.vue')
          },
          {
            path: 'followings',
            name: 'followings',
            component: () => import('../components/FollowingCards.vue')
          }
        ]
      }
    ]
  },


  {
    path: '/admin/signin',
    name: 'admin-signin',
    component: () => import('../views/AdminSignIn.vue'),
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

/*router.beforeEach(async (to, from, next) => {
  // 從 localStorage 和 vuex 取出 token
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token
  // 預設是 vuex 內的驗證狀態
  let isAuthenticated = store.state.isAuthenticated
  // 如果 localStorage token 存在、卻與 vuex 的不相同，故再次驗證
  if (token && token !== tokenInStore) {
    // 取得驗證成功與否
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up', 'sign-in', 'admin-signin']

  // 如果 token 無效且進入需要驗證的頁面則轉址到登入頁
  if (
    !isAuthenticated &&
    !pathsWithoutAuthentication.includes(to.name)
  ) return next('/signin')

  // 如果 token 有效且進入不需要驗證到頁面則轉址到首頁
  if (
    isAuthenticated &&
    pathsWithoutAuthentication.includes(to.name)
  ) return next('/users/main')

  next()
})**/

export default router
