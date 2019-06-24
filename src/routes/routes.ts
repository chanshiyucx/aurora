import Home from "@/views/Home/Index.vue";

const routes: any[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About/Index.vue")
  },
  {
    path: "/archive",
    name: "archive",
    component: () => import("@/views/Archive/Index.vue")
  },
  {
    path: "/tag",
    name: "tag",
    component: () => import("@/views/Tag/Index.vue")
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/Blog/Index.vue")
  }
];

export default routes;
