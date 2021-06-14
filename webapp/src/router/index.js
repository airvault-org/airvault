import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/views/Landing.vue'
import Items from '@/views/Items.vue'
import Login from '@/views/Login.vue'
import NewVault from '@/views/NewVault.vue'
import Register from '@/views/Register.vue'
import Settings from '@/views/Settings.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/vaults/new',
    name: 'New vault',
    component: NewVault,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isUserAuthenticated) {
      next({ name: 'Login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
