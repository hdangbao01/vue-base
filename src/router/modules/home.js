import constants from '@/constants'

const home = {
    path: constants.routePages.HOME_PAGE,
    component: () => import('@/components/Layout/DefaultLayout.vue'),
    meta: {
        title: 'Dng'
    },
    children: [
        {
            path: constants.routePages.HOME_PAGE,
            name: "home",
            component: () => import("@/pages/home/Home.vue")
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not found',
            component: () => import("@/pages/home/Home.vue"),
        }
    ]
}

export default home