import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { loadIcons } from '@/plugins/icons'
import App from './App.vue'
import router from './router'
import './style.css'

loadIcons()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
