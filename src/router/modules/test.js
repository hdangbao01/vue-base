const test = {
    path: '/test',
    component: () => import('@/components/Layout/DefaultLayout.vue'),
    meta: {
        title: 'Dng'
    },
    children: [
        {
            path: '/test',
            name: "test",
            component: () => import("@/pages/Test.vue")
        }
    ]
}

export default test