import { createApp } from 'vue';
import { store } from '@/stores';
import './style.css';
import App from './App.vue';

const app = createApp(App);

app.use(store);
app.mount('#app');
