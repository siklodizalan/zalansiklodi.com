import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LenisVue from 'lenis/vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

createApp(App)
    .use(LenisVue)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .mount('#app')
