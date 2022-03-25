# 一、项目搭建

## 1、多入口问题。

①、`vite.config.ts` 文件中 : 增加build 配置选项

```tsx
export default defineConfig({
 ···
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'), //多入口
        login: path.resolve(__dirname, 'login.html'),
      },
    },
  },
····
});
```

②、增加 新文件  分别引入即可。登陆成功后 使用   window.top.location.href = 'http://localhost:4000/login.html';   跳转到 项目页面。

 

![image-20220324181603822](C:\Users\98683\AppData\Roaming\Typora\typora-user-images\image-20220324181603822.png)![image-20220324181608728](C:\Users\98683\AppData\Roaming\Typora\typora-user-images\image-20220324181608728.png)