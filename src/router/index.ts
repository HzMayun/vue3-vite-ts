import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/wkb.html',
    component: () => import('@/views/goods/index.vue'),
  },
  {
    path: '/wkb.html',
    name: 'wkb',
    redirect: '/wkb.html/retail/goods-mgr/product',
    component: () => import('@/views/goods/index.vue'),
    children: [
      {
        //二级路由：商品管理
        path: '/wkb.html/retail/goods-mgr/product',
        name: 'goods',
        redirect: '/wkb.html/retail/goods-mgr/product/list',
        component: () => import('@/views/goods/index.vue'),
        children: [
          //三级路由 商品列表
          {
            path: '/wkb.html/retail/goods-mgr/product/list',
            name: 'goods-list',
            component: () => import('@/views/goods/goods-list/goods-list.vue'),
          },
          //三级路由 组合商品商品列表
          {
            path: '/wkb.html/retail/goods-mgr/goods-combined',
            name: 'goods-combined',
            component: () => import('@/views/goods/combined-goods/goods-list.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/dmp.html',
    name: 'dmp',
    redirect: '/dmp.html/manage',
    component: () => import('@/views/goods/index.vue'),
    children: [
      {
        //二级路由：客户管理
        path: '/dmp.html/manage',
        name: 'manage',
        redirect: '/dmp.html/manage/rules',
        component: () => import('@/views/goods/index.vue'),
        children: [
          //规则设置
          {
            path: '/dmp.html/manage/rules',
            name: 'rules',
            component: () => import('@/views/goods/goods-list/goods-list.vue'),
            redirect: '/dmp.html/manage/rules/list',
            children: [
              //规则列表
              {
                path: '/dmp.html/manage/rules/list',
                name: 'rules-list',
                component: () => import('@/views/goods/goods-list/goods-list.vue'),
              },
            ],
          },
          //全域客户
          {
            path: '/dmp.html/manage/cue',
            name: 'cue',
            component: () => import('@/views/goods/goods-list/goods-list.vue'),
            redirect: '/dmp.html/manage/cue/list',
            children: [
              //全域客户列表
              {
                path: '/dmp.html/manage/cue/list',
                name: 'cue-list',
                component: () => import('@/views/goods/goods-list/goods-list.vue'),
              },
            ],
          },
        ],
      },
    ],
  },

  // {
  //   //二级路由：商品管理
  //   path: '/wkb.html/retail/goods-mgr/product',
  //   name: 'goods-list',
  //   redirect: '/wkb.html/retail/goods-mgr/product/list',
  //   component: () => import('@/views/goods/index.vue'),
  //   children: [
  //     //三级路由 商品列表
  //     {
  //       path: '/wkb.html/retail/goods-mgr/product/list',
  //       name: 'goods-list',
  //       component: () => import('@/views/goods/goods-list/goods-list.vue'),
  //     },
  //     //三级路由 组合商品商品列表
  //     {
  //       path: '/wkb.html/retail/goods-mgr/goods-combined',
  //       name: 'goods-combined',
  //       component: () => import('@/views/goods/combined-goods/goods-list.vue'),
  //     },
  //   ],
  // },
];
/* 
{
    path: '/',
    component: () => import('@/views/goods/index.vue'),
    redirect: '/wkb.html',
  },
  {
    path: '/wkb.html',
    redirect: '/wkb.html/retail/goods-mgr/product',
    component: () => import('@/views/goods/index.vue'),
    children: [
      {
        //二级路由：商品管理
        path: '/wkb.html/retail/goods-mgr/product',
        name: 'goods-list',
        redirect: '/wkb.html/retail/goods-mgr/product/list',
        component: () => import('@/views/goods/index.vue'),
        children: [
          //三级路由 商品列表
          {
            path: '/wkb.html/retail/goods-mgr/product/list',
            name: 'goods-list',
            component: () => import('@/views/goods/goods-list/goods-list.vue'),
          },
          //三级路由 组合商品列表
          {
            path: '/wkb.html/retail/goods-mgr/goods-combined',
            name: 'goods-combined',
            component: () => import('@/views/goods/combined-goods/goods-list.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/dmp.html',
    redirect: '/dmp.html/manage',
    component: () => import('@/views/goods/index.vue'),
    children: [
      {
        //二级路由：客户管理
        path: '/dmp.html/manage',
        name: 'goods-list',
        redirect: '/dmp.html/manage/rules',
        component: () => import('@/views/goods/index.vue'),
        children: [
          //三级路由 商品列表
          {
            path: '/dmp.html/manage/rules',
            name: 'goods-list',
            component: () => import('@/views/goods/goods-list/goods-list.vue'),
          },
          //三级路由 组合商品列表
          {
            path: '/dmp.html/manage/cue',
            name: 'goods-combined',
            component: () => import('@/views/goods/combined-goods/goods-list.vue'),
          },
        ],
      },
    ],
  },


*/
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
