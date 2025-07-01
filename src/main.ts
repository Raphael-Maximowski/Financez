import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.ts'
import VCalendar from 'v-calendar';
import money from 'v-money3'
import 'bootstrap/dist/css/bootstrap.min.css'
import "vue3-toastify/dist/index.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import '@/assets/styles.css'
import 'v-calendar/style.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VCalendar, {})
app.use(money)

app.mount('#app')
