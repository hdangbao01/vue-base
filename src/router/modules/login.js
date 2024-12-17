import constants from '@/constants'

const login = {
    path: constants.routePages.LOGIN_PAGE,
    component: () => import('@/components/Layout/GuestLayout.vue'),
    meta: {
        title: 'Login'
    },
    children: [
        {
            path: constants.routePages.LOGIN_PAGE,
            name: "login",
            component: () => import("@/pages/login/Login.vue")
        }
    ]
}

export default login