import { createApp } from 'vue';
import App from './Login.vue';
import ElementPlus from 'element-plus';
import router from './router/index';

const app = createApp(App);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.use(router);
app.mount('#app');
