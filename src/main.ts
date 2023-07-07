import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { installModalPlugin } from './plugins/modal'
import { installDirectives } from './directives'
const app = createApp(App)

app.use(installModalPlugin)
app.use(installDirectives)
app.mount('#app')
