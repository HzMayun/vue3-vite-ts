import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    //二级路由：商品管理
    path: '/retail/goods-mgr/product',
    name: 'goods-list',
    redirect: '/retail/goods-mgr/product/list',
    component: () => import('@/views/goods/index.vue'),
    children: [
      //三级路由 商品列表
      {
        path: '/retail/goods-mgr/product/list',
        name: 'goods-list',
        component: () => import('@/views/goods/goods-list/goods-list.vue'),
      },
      //三级路由 组合商品列表
      {
        path: '/retail/goods-mgr/goods-combined',
        name: 'goods-combined',
        component: () => import('@/views/goods/combined-goods/goods-list.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
