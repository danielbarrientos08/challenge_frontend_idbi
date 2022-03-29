import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterUserView from '../views/RegisterUserView.vue'
import ListGroupsView from '../views/ListGroupsView.vue'
import GroupView from '../views/GroupView.vue'
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
    component: RegisterUserView
  },
  {
    path: '/group/:id',
    name: 'group',
      meta: { requiredAuth: true },
    component: GroupView
  },
  {
    path: '/groups',
    name: 'groups',
    meta: { requiredAuth: true },
    component: ListGroupsView
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
