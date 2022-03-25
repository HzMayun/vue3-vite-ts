<template>
  <div class="login">
    <div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <h3 class="button" type="text">登录</h3>
          </div>
        </template>
        <div>
          <div class="user">
            <span> 账号：</span>
            <el-input style="width: 80%" size="large" clearable type="text" v-model="userName" />
          </div>
          <div class="password">
            <span>密码：</span>
            <el-input
              style="width: 80%"
              clearable
              show-password
              size="large"
              type="password"
              v-model="password"
            />
          </div>
        </div>
        <div class="login-btn">
          <el-button
            style="width: 100px"
            type="primary"
            size="large"
            :loading="loading"
            @click="submit"
            >登录</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import api from '../api/index';
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      userName: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    //登录按钮
    submit() {
      const params: { userName: string; password: string } = {
        userName: this.userName,
        password: this.password,
      };
      console.log(params);
      this.loading = true;
      api.reqLogin(params).then((res: any) => {
        //登录后的操作
        if (!res.success || res.success === 'false' || res.data === false || res.data === 'false') {
          this.loading = false;
          ElMessage.error(res.errorMessage);
          return;
        }
        window.top.location.href = 'http://web.wakedata.com:4000/login.html';
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  .box-card {
    width: 50%;
    height: 600px;
    margin: 0 auto;
    .user {
      margin-top: 50px;
    }
    .password {
      margin-top: 50px;
    }
    .login-btn {
      margin-top: 50px;
    }
  }
}
</style>
