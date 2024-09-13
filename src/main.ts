import './assets/main.css'

import { createApp } from 'vue'

// Store
import { createPinia } from 'pinia'

// Library
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
