import { createRouter, createWebHistory } from "vue-router";
import PhotosView from "../views/PhotosView.vue";
import PasswordView from "../views/PasswordView.vue";

const routes = [
  {
    path: "/",
    name: "photos-view",
    component: PhotosView,
  },
  {
    path: "/password",
    name: "password-view",
    component: PasswordView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const vuex = await import("@/store");
  console.log(to);
  if (to.path !== "/password") {
    console.log("here");
    console.log(vuex.store.state);
    if (vuex.store.state.token === "") {
      return "/password";
    }
  }
});

export default router;
