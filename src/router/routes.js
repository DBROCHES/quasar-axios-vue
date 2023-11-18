const routes = [{
        path: "/",
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () =>
                    import ("pages/IndexPage.vue") },
            {
                path: "/about",
                component: () =>
                    import ("pages/About.vue"),
            },
            {
                path: "/vehicle",
                component: () =>
                    import ("pages/Vehicle.vue"),
            },
            {
                path: "/hotel",
                component: () =>
                    import ("pages/Hotel.vue"),
            },
            {
                path: "/activities",
                component: () =>
                    import ("pages/Activities.vue"),
            },
            {
                path: "/contracts",
                component: () =>
                    import ("pages/Contracts.vue"),
            },
            {
                path: "/modality",
                component: () =>
                    import ("pages/Modality.vue"),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () =>
            import ("pages/ErrorNotFound.vue"),
    },
];

export default routes;