// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createVuestic } from "vuestic-ui";
import { registerAbbreviationComponents } from "./components/abbreviations";

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
registerAbbreviationComponents(app);
app.mount("#app");

registerSW({ immediate: true });
