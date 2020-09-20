import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/test',
    },
    {
      path: '/test',
      name: 'test',
      component: () =>import('../pages/test.vue')
    },
    {
      path: '/whiteModel',
      name: 'whiteModel',
      component: () =>import('../pages/ImportWhiteModel.vue')
    }
  ]
});