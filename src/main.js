import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Router from "./router"
import App from './App.vue'

// // Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//     components,
//     directives,
//   })


const app = createApp(App)
app.use(createPinia())
app.use(Router)
app.mount('#app')
