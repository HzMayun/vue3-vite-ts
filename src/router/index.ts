import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Goods from '@/views/goods/goods-list.vue';
// import Goods from '@/views/goods/goods-list.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/retail/goods-list',
    name: 'goods-list',
    component: Goods,
  },
  {
    path: '/retail/goods-mgr/goods-combined',
    name: 'goods-combined',
    component: () => import('@/views/combined-goods/goods-list.vue'),
  },
  // {
  //   path: '/sider',
  //   name: 'sider',
  //   component: () => import(/* webpackChunkName: "About" */ '../components/sider.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
