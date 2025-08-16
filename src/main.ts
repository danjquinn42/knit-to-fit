// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createVuestic } from "vuestic-ui";

// Vuestic styles + icons
import "vuestic-ui/styles/essential.css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

// (optional) your own styles
import "./style.css";

// PWA
import { registerSW } from "virtual:pwa-register";

const app = createApp(App);
app.use(createVuestic());
app.use(router);
app.mount("#app");

registerSW({ immediate: true });
