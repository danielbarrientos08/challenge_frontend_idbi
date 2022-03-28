import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ListGroupsView from '../views/ListGroupsView.vue'
import Store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/groups',
    name: 'groups',
    meta: { requiredAuth: true },
    component: ListGroupsView
  },
  {
    path: '/home',
    name: 'home',
    meta: { requiredAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  
  if (to.matched.some((record) => record.meta.requiredAuth))
  {  
      
      if (Store.state.auth)
          next();
      else
        next({ name: "login" });
  }
  else {
      next();
  }
});

export default router
