import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/rights.vue'
import Role from '@/components/role/role.vue'

Vue.use(Router)

const router= new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login

    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name:'rights',
          path:'/rights',
          component:Right
        },
        {
          name:'roles',
          path:'/roles',
          component:Role
        }
      ]
    }
  ]
})

// 路由配置生效之前会先来到下面代码,即路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path==='/login') {
    next()
  }else {
     const token=localStorage.getItem('token')
     if(!token) {
       router.push({name:'login'})
       return
     }
       next()
  }
})
export default router