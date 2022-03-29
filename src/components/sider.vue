<template>
  <div>
    <el-tabs v-model="baseUrl" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in menuList" :key="item.id" :label="item.name" :name="item.url">
        <el-row class="menu-cent">
          <el-col :span="4">
            <el-menu
              :default-active="path"
              class="el-menu-vertical-demo"
              :unique-opened="true"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-sub-menu
                :index="String(child.url)"
                v-for="child in item.childMenu"
                :key="child.id"
                :show-timeout="100"
                :hide-timeout="100"
              >
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>{{ child.name }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="childSecd in child.childMenu"
                    :key="childSecd.id"
                    :index="String(item.url + childSecd.url)"
                    @click="handleMenuTtem(childSecd, item.url + childSecd.url)"
                    >{{ childSecd.name }}</el-menu-item
                  >
                </el-menu-item-group>
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
        <div class="content">
          <el-tabs class="viewsActiveName" v-model="viewsActiveName">
            <el-tab-pane
              v-for="viewTable in viewTableList"
              :key="viewTable.id"
              :label="viewTable.name"
              :name="viewTable.url"
            >
            </el-tab-pane>
          </el-tabs>

          <router-view />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import api from '@/api/index';
import type { TabsPaneContext } from 'element-plus';
import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';
import { useUserStore } from '@/store/routerMenu';
import { getRouteLeafs } from '@/utils/routeHandle';

export default {
  data() {
    return {
      baseUrl: '/wkb.html',
      menuList: [],
      viewTableList: [], //页面菜单的切换  最后一级
      viewsActiveName: '',
    };
  },
  components: { Location, Document, IconMenu, Setting },
  computed: {
    userStore() {
      const userStore = useUserStore();
      return userStore.routerMenu;
    },

    path() {
      let router = this.$router.currentRoute.value;
      const list = router.matched;
      console.log(list);
      const routeLeafs = useUserStore().routerMenu;
      for (let i = list.length - 1; i >= 0; i--) {
        if (routeLeafs && routeLeafs.has(list[i].path)) {
          return list[i].path;
        }
      }
      // return '/';
      return list[0].path;
    },
  },
  created() {
    //设置cookies
    api.reqSetCookie().then((res: any) => {
      const params = {
        menuIdList: [0],
        allChildren: true,
      };
      //成功后拿菜单
      api.reqGetMenu(params).then((res: any) => {
        console.log(res);
        this.menuList = res.data;
        const userStore = useUserStore();
        //取一级菜单 做定位
        let router = this.$router.currentRoute.value;
        const list = router.matched;
        this.baseUrl = list[0].path;
        // console.log(list, this.baseUrl);
        //提取出二级路由，写进pinia
        userStore.updateName(getRouteLeafs(this.menuList));
      });
    });
    //取角色信息
    // api.reqRoleList().then((res: any) => {
    //   console.log(res);
    // });
  },
  methods: {
    //选中菜单
    handleMenuTtem(childSecd: any, index: string) {
      console.log(childSecd.url);
      console.log('index====>', index);
      this.viewTableList = childSecd.childMenu;
      this.$router.push(index);
    },
    goGoods(url: string) {
      this.$router.push(url);
    },
    //登录按钮
    handleClick(tab: any) {
      console.log(tab.props.name);
      this.$router.push(tab.props.name);
    },
    handleOpen(tab: TabsPaneContext, event: Event) {
      console.log(tab, event);
    },
    handleClose(tab: TabsPaneContext, event: Event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped lang="scss">
.demo-tabs {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
:deep(.el-tabs__nav-scroll) {
  background-color: darkgray;
  width: 100%;
  padding-left: 200px;
}
.el-menu {
  border: none;
  width: 200px;
}
.el-menu-item {
  color: #717378;
  font-weight: 500;
}
.el-menu-item.is-active {
  color: #fa7516;
}
.menu-cent {
  // height: ;
  position: fixed;
  top: 50px;

  background-color: aqua;
  .el-col {
    max-width: none;
  }
}
</style>
<style>
:deep(.el-submenu.is-opened) :deep(.el-submenu__title) {
  background-image: linear-gradient(to right, #dba81b, #e12020);
  background-color: #060708;
}
.el-menu-item.is-active {
  background-color: #fff7e6;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #fff7e6;
}
.content {
  background-color: bisque;
  height: 800px;
  margin-left: 200px;
}
</style>
