import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from './router/index';

console.log(' App   router', router);

const app = createApp(App);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.use(router);
app.mount('#app');
