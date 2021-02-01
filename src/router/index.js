import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'

import Home from '../views/Home.vue'
import Fund from '../views/Fund.vue'
import Info from '../views/Info.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/index"
  },
  {
    path: '/index',
    name:'index',
    component:Index,
    children:[
      {
        path: '/',
        redirect:"/home"
      },
      {
        path: '/home',
        name:'home',
        component:Home,
      },
      {
        path: '/fund',
        name:'fund',
        component:Fund,
      },
      {
        path: '/info',
        name:'info',
        component:Info,
      },

  ]
  },
  {
    path: '/register',
    name:"register",
    component:Register
  },
  {
    path: '/login',
    name:"login",
    component:Login
  },
  {
    path: '*',
    name:"notFound",
    component:NotFound
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  const isLogin= localStorage.fundToken?true:false;
  if(to.path=='/login'||to.path=='/register')
  {
    next();
  }
  else{
    isLogin?next():next('/login')
  }

} )

export default router
