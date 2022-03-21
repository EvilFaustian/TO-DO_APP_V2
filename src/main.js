import { createApp } from 'vue'
/* import App from './App.vue' */
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import store from "./store";
import Master from './components/MasterPage'

createApp(Master).use(store).use(router).mount('#app')
// Make BootstrapVue available throughout your project