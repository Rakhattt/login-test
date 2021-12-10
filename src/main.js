import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './less/style.less'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/compat'
// import vueTopprogress from 'vue-top-progress'
Vue.config.productionTip = false
Vue.use(Vuelidate)
// Vue.use(vueTopprogress)


new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBMky2fVsG6EuU73UpIMIoeM7tRT34JNww',
      authDomain: 'itc-ads-2400e.firebaseapp.com',
      projectId: 'itc-ads-2400e',
      storageBucket: 'itc-ads-2400e.appspot.com',
      messagingSenderId: '216204408020',
      appId: '1:216204408020:web:72d7b5133790e832c8f741',
      measurementId: 'G-Z22GFXHM1P'
    })
  }
}).$mount('#app')
