import { createWebHistory, createRouter } from 'vue-router'

import * as modules from './modules'

const routes = []

Object.keys(modules).forEach(key => {
    routes.push(modules[key])
});

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return new Promise((resolve) => {
          resolve({ left: 0, top: 0 })
        })
    }
})

// window.addEventListener('storage', () => {
//     const isLoggedIn = localStorage.getItem("token")

//     if (!isLoggedIn) {
//         router.push('/login')
//     }
// })

// const loginPage = ['/login']
// router.beforeEach((to, from, next) => {
//     const isLoggedIn = localStorage.getItem("token")

//     if (to.meta.title) {
//         document.title = to.meta.title
//     }

//     if (loginPage.indexOf(to.path) === -1) {
//         if (isLoggedIn) {
//             next()
//         } else {
//             next('/login')
//         }
//     } else if (isLoggedIn) {
//         next('/')
//     } else {
//         next()
//     }
// })

export default router