import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFinalModal from 'vue-final-modal'
import Notifications from '@kyvg/vue3-notification'


// console.log('eventooo  ',eventBus.$emit('loader', {'eventContent': true}))

const app = createApp(App)

app.use(Store)
app.use(Router)
app.use(VueAxios, axios)
app.use(VueFinalModal)
app.use(Notifications)
app.mount('#app')
//variables globales
const uri ={
    local : 'http://localhost:8000',
    production : 'https://tkambio.rumisofperu.com',
}

//Nombre de la app
app.config.globalProperties.$app_name = 'Demo'

//Uri 
app.config.globalProperties.$uri = uri.local