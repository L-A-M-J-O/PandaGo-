import './assets/main.css'

import { createApp } from 'vue'

// Store
import { createPinia } from 'pinia'

// Library
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
