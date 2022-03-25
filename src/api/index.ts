// 登录接口
import services from '../utils/services.js';
const baseURL = '';

export default {
  reqLogin(params: { userName: string; password: string }) {
    return services.post(baseURL + '/api/c/login/login', params, {
      action: '登录',
    });
  },
  reqGetMenu(params: any) {
    return services.post(baseURL + '/api/wp/permission/menu/show/menu', params, {
      action: '获取menu菜单',
    });
  },
  reqSetCookie() {
    return services.get(baseURL + '/api/wp/loginV2/query', {
      action: '设置Cookie',
    });
  },
  reqRoleList() {
    return services.get(baseURL + '/api/wp/employee/query/role_list', {
      action: '获取角色信息',
    });
  },
  // getStaudents(params) {
  //   return services.get(`${WpSchema1}/api/students`, {
  //     action: "获取学生信息",
  //   });
  // },
};
