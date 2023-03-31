import { createApp } from 'vue'
import App from './App.vue'
import regPrimeVue from './prime';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"
import "./style.css"

const app = createApp(App);
regPrimeVue(app)
app.mount('#app')
