import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "../components/App.vue";

const pinia = createPinia();
if (!window.VUE_APP_IS_INITIALIZED) {
  const sidebarConfig = window.VUE_SIDEBAR_INITIAL_DATA || {};
  const mountEl = document.querySelector("#vue-handled-sidebar");

  // Also check if the mount element exists on the page
  
  if (mountEl) {
    const app = createApp(App, { sidebarConfig: sidebarConfig });
    app.use(pinia);
    app.mount(mountEl);

    window.VUE_APP_IS_INITIALIZED = true;
  }
}
