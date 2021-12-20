import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

import firebaseConfig from './utils/config'
import { initializeApp } from 'firebase/app';
initializeApp(firebaseConfig)
store.dispatch('checkAuth')

const app = createApp(App);

app.use(VueSweetalert2)
app.use(store);
app.use(router);
app.mount('#app');
