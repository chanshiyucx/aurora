const routes: any[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home/Index.vue")
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
  },
  {
    path: "/post/:number",
    name: "post",
    component: () => import("@/views/Post/Index.vue")
  }
];

export default routes;
