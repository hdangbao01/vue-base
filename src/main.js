import { createApp } from 'vue'
import * as directives from '@/directives'

import { createPinia } from 'pinia'
import { useValidate } from '@/plugins/vee-validate'
import { tippy } from '@/plugins/vue-tippy'
// import { QuillEditor } from '@vueup/vue-quill'
import VueDatePicker from '@vuepic/vue-datepicker';
import VueSplide from '@splidejs/vue-splide';
import router from './router'

// import vue3GoogleLogin from 'vue3-google-login'
// import VueAppleLogin from 'vue-apple-login'

import '@vuepic/vue-datepicker/dist/main.css'
// import '@vueup/vue-quill/dist/vue-quill.snow.css';

import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)

Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
})

useValidate(app)
app.use(router)
app.use(pinia)
app.use(VueSplide)
// app.use(vue3GoogleLogin, {
//     clientId: import.meta.env.VITE_BASE_GOOGLE_CLIENT_ID
// })
// app.use(VueAppleLogin, {
//     clientId: "s-booking.net",
//     scope: "name email",
//     redirectURI: "https://s-booking.net/auth/apple/callback",
//     state: "500",
//     usePopup: true,
// })

// app.component('QuillEditor', QuillEditor)
app.component('VueDatePicker', VueDatePicker)
tippy(app)

app.mount('#app')
