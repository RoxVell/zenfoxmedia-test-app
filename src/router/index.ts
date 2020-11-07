import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Users from '../views/Users.vue';
import UserProfile from '../views/UserProfile.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Users
  },
  {
    path: "/user",
    name: "User",
    component: UserProfile,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
