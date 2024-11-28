import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'navbar',
    component: () => import('../components/NavBar.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/cal-grade',
        name: 'cal-grade',
        component: () => import('../views/Cal-grade.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue')
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('../views/History.vue')
      },
      {
        path: '/product_create',
        name: 'product_create',
        component: () => import('../views/Products_create.vue')
      },
      {
        path: '/product/:id',
        name: 'product_detail',
        component: () => import('../views/Product_detail.vue')
      },
      {
        path: '/product/update/:id',
        name: 'productUpdate',
        component: () => import('../views/Product_update.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Carts.vue')
      }
      
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
