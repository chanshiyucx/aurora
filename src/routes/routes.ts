import Home from "@/views/home/Index.vue";

const routes: any[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/Index.vue")
  },
  {
    path: "/tag",
    name: "tag",
    component: () => import("@/views/tag/Index.vue")
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/blog/Index.vue")
  }
];

export default routes;
