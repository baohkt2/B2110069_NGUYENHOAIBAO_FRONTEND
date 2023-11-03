import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/main.css";
import router from "./router";
import App from "./App.vue";

createApp(App).use(router).mount("#app");
