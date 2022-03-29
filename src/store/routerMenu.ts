import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'routerMenu', // id必填，且需要唯一
  state: () => {
    return {
      routerMenu: new Map(),
      baseUrl: '/wkb.html', //初始值
    };
  },
  actions: {
    updateName(name: any) {
      this.routerMenu = name;
    },
    //内容区域tab
    updateBaseUrl(baseUrl: any) {
      this.baseUrl = baseUrl;
    },
  },
});
