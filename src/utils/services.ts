/**
 * 这里是ajax的通用访问接口处理
 */
import Qs from 'qs';
import axios from 'axios';
// import { message } from "antd";
const service: any = axios.create({
  baseURL: '',
  timeout: 60000,
  // withCredentials: true,
  transformRequest: function (data: any, config: any, test: any) {
    return Qs.stringify(data);
  },
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

/**
 * 服务端接口empty字符串跟null返回的结果不同，过滤掉empty字符串
 * @param params
 */
function filterEmptyKey(params: any) {
  Object.keys(params).forEach((key) => {
    if (params[key] === '' || params[key] === null) {
      delete params[key];
    }
  });
}
service.interceptors.request.use(
  (config: any) => {
    if (config.method === 'post') {
      const params = {
        ...config.data,
      };
      filterEmptyKey(params);
      const lowerUrl = (config.url + '').toLocaleLowerCase();
      const hasAbsoluteSchema = config.url.indexOf('http') === 0;
      if (!hasAbsoluteSchema) {
        if (lowerUrl.indexOf('/dsp/') > -1 || lowerUrl.indexOf('/dmp/') > -1) {
          for (const key in params) {
            const type = toString.call(params[key]);
            if (type === '[object Object]' || type === '[object Array]') {
              params[key] = JSON.stringify(params[key]);
            }
          }
        }
      }

      // params._t = Date.parse(new Date()) / 1000;
      config.data = params;
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(String(new Date())) / 1000,
        ...config.params,
      };
      filterEmptyKey(config.params);
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);
service.interceptors.response.use((res) => {
  const { data, config } = res;
  if ((!data.success || data.success === 'false') && data.code !== 200) {
    const msg = data.errorMessage || data.message || '未知错误';
    const code = data.errorCode || data.code || -1000;
    return Promise.reject({
      code: code,
      message: msg,
    });
  }
  return data || {};
});
/**
 * 以json格式向后端提交数据
 *
 * @param {String} url 请求的url
 * @param {Object} params 参数
 * @param {Object} config 配置
 *
 * @returns promise对象
 */
service.json = (url: string, params: object, config: any) => {
  let isArray = Object.prototype.toString.call(params) === '[object Array]';
  const defaultConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    transformRequest: function (data: any, requestConfig: any) {
      if (isArray) {
        return JSON.stringify(params);
      }
      return JSON.stringify(data);
    },
  };
  const newConfig = Object.assign(defaultConfig, config);
  return service.post(url, params, newConfig);
};
export default service;
