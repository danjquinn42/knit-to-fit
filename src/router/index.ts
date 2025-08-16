import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../components/ToeUpSockForm.vue") },
    {
      path: "/to-up/instructions",
      name: "toeUpInstructions",
      component: () => import("../components/ToeUpInstructions.vue"),
    },
  ],
});
