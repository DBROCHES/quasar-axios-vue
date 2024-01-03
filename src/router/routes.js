const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/tourPackage",
        component: () => import("pages/TourPackage.vue"),
      },
      {
        path: "/about",
        component: () => import("pages/About.vue"),
      },
      {
        path: "/vehicle",
        component: () => import("pages/Vehicle.vue"),
      },
      {
        path: "/hotel",
        component: () => import("pages/Hotel.vue"),
      },
      {
        path: "/room",
        component: () => import("pages/Room.vue"),
      },
      {
        path: "/meal",
        component: () => import("pages/Meal.vue"),
      },
      {
        path: "/activities",
        component: () => import("pages/Activities.vue"),
      },
      {
        path: "/contracts",
        component: () => import("pages/Contracts.vue"),
      },
      {
        path: "/modality",
        component: () => import("pages/Modality.vue"),
      },
      {
        path: "/reportHotelContracts",
        component: () => import("pages/ReportHotelContracts.vue"),
      },
      {
        path: "/reportListTransportContract",
        component: () => import("pages/ReportListTransportContract.vue"),
      },
      {
        path: "/reportHotelSeason",
        component: () => import("pages/ReportHotelContBySeason.vue"),
      },
      {
        path: "/reportActiveHotels",
        component: () => import("pages/ReportActiveHotels.vue"),
      },
      {
        path: "/season",
        component: () => import("pages/Season.vue"),
      },
      {
        path: "/PintartourPackage",
        name: "PintartourPackage",
        component: () => import("components/PintartourPackage.vue"),
      },
      {
        path: "/provinces",
        component: () => import("pages/Provinces.vue"),
      },
      {
        path: "/users",
        component: () => import("pages/Users.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
