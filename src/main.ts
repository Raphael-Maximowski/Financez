import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar';
import money from 'v-money3'
import 'bootstrap/dist/css/bootstrap.min.css'
import "vue3-toastify/dist/index.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/style.css'
import 'bootstrap'
import 'v-calendar/style.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VCalendar, {})
app.use(money)

app.mount('#app')
