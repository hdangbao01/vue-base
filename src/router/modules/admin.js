const admin = {
    path: '/admin',
    component: () => import('@/components/Layout/DefaultLayout.vue'),
    meta: {
        title: 'Admin'
    },
    children: [
        {
            path: "/admin",
            name: "admin",
            component: () => import("@/pages/admin/Admin.vue")
        }
    ]
}

export default admin