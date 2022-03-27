import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  
  if (to.matched.some((record) => record.meta.requiresAuth))
  {  
      
      if (Store.state.auth){
          next();
      } 
      else{
          next({ name: "login" });
      }
  }
  else {
      next();
  }
});

export default router
